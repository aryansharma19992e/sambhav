"""
FastAPI backend for Student Dropout Prediction ML Model
Integrates with MERN stack frontend via REST API
"""

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
from typing import List, Optional, Dict, Any
import pandas as pd
import numpy as np
import joblib
import os
from datetime import datetime
import logging
from contextlib import asynccontextmanager

# Import our ML model
from student_dropout_predictor import StudentDropoutPredictor

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global variables for model
predictor = None
model_loaded = False

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    global predictor, model_loaded
    try:
        predictor = StudentDropoutPredictor()
        
        # Try to load existing model, if not create and train a new one
        if os.path.exists('student_dropout_model.pkl'):
            predictor.load_model('student_dropout_model.pkl')
            logger.info("Loaded existing model from file")
        else:
            logger.info("No existing model found. Training new model...")
            # Generate data and train model
            df = predictor.load_data()
            X, y = predictor.preprocess_data(df)
            results, X_test, y_test = predictor.train_models(X, y)
            predictor.save_model('student_dropout_model.pkl')
            logger.info("New model trained and saved")
        
        model_loaded = True
        logger.info("ML Model initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize ML model: {e}")
        model_loaded = False
    
    yield
    
    # Shutdown
    logger.info("Shutting down ML service")

app = FastAPI(
    title="Student Dropout Prediction API",
    description="ML-powered API to predict student dropout risk based on attendance and assignment grades",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware for MERN stack integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class StudentData(BaseModel):
    student_id: str
    avg_attendance: float
    avg_assignment_grade: float
    attendance_trend: Optional[float] = 0.0
    assignment_trend: Optional[float] = 0.0
    low_attendance_months: Optional[int] = 0
    failing_assignments: Optional[int] = 0
    missed_consecutive_days: Optional[int] = 0
    late_submissions: Optional[int] = 0
    participation_score: Optional[float] = 75.0
    previous_gpa: Optional[float] = 3.0
    
    @validator('avg_attendance')
    def validate_attendance(cls, v):
        if not 0 <= v <= 100:
            raise ValueError('Attendance must be between 0 and 100')
        return v
    
    @validator('avg_assignment_grade')
    def validate_grade(cls, v):
        if not 0 <= v <= 100:
            raise ValueError('Assignment grade must be between 0 and 100')
        return v

class BulkStudentData(BaseModel):
    students: List[StudentData]

class PredictionResponse(BaseModel):
    student_id: str
    dropout_probability: float
    risk_level: str
    predicted_dropout: bool
    confidence: float
    recommendations: List[str]

class BulkPredictionResponse(BaseModel):
    predictions: List[PredictionResponse]
    summary: Dict[str, Any]

class ModelMetrics(BaseModel):
    accuracy: float
    auc_score: float
    feature_importance: Dict[str, float]
    model_info: Dict[str, Any]

# Helper functions
def get_risk_level(probability: float) -> str:
    """Determine risk level based on dropout probability"""
    if probability >= 0.7:
        return "HIGH"
    elif probability >= 0.3:
        return "MEDIUM"
    else:
        return "LOW"

def get_recommendations(probability: float, student_data: dict) -> List[str]:
    """Generate recommendations based on risk level and student data"""
    recommendations = []
    
    if probability >= 0.7:
        recommendations.extend([
            "Immediate intervention required",
            "Schedule emergency counseling session",
            "Implement daily attendance monitoring",
            "Provide intensive academic support"
        ])
        
        if student_data.get('avg_attendance', 100) < 70:
            recommendations.append("Critical attendance issue - contact family")
        
        if student_data.get('avg_assignment_grade', 100) < 60:
            recommendations.append("Severe academic performance concern - consider tutoring")
            
    elif probability >= 0.3:
        recommendations.extend([
            "Enhanced monitoring recommended",
            "Weekly check-ins with advisor",
            "Additional tutoring support",
            "Monitor for declining trends"
        ])
        
        if student_data.get('avg_attendance', 100) < 80:
            recommendations.append("Improve attendance tracking")
            
    else:
        recommendations.extend([
            "Continue regular monitoring",
            "Maintain current support level",
            "Consider as peer mentor candidate"
        ])
    
    return recommendations

def check_model_ready():
    """Dependency to check if model is loaded"""
    if not model_loaded or predictor is None:
        raise HTTPException(status_code=503, detail="ML model not ready")
    return True

# API Endpoints
@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Student Dropout Prediction API",
        "status": "running",
        "model_loaded": model_loaded,
        "version": "1.0.0"
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict_single_student(student: StudentData):
    """Predict dropout risk for a single student"""
    try:
        student_df = pd.DataFrame([student.dict()])
        X, _ = predictor.preprocess_data(student_df)
        predictions, probabilities = predictor.generate_predictions(X)

        probability = probabilities[0]
        predicted_dropout = predictions[0]
        risk_level = get_risk_level(probability)
        confidence = max(probability, 1 - probability)
        recommendations = get_recommendations(probability, student.dict())

        return PredictionResponse(
            student_id=student.student_id,
            dropout_probability=probability,
            risk_level=risk_level,
            predicted_dropout=predicted_dropout,
            confidence=confidence,
            recommendations=recommendations
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "model_loaded": model_loaded}

# API Endpoint for testing with sample data
@app.get("/test-sample", response_model=BulkPredictionResponse)
async def test_sample_data():
    """Test the model with predefined sample data"""
    check_model_ready()

    # Sample data with all expected features
    sample_data = [
        {
            "student_id": "STU_0001",
            "avg_attendance": 85.0,
            "avg_assignment_grade": 85.0,
            "attendance_trend": 0.5
        },
        {
            "student_id": "STU_0002",
            "avg_attendance": 60.0,
            "avg_assignment_grade": 60.0,
            "attendance_trend": -0.3
        },
        {
            "student_id": "STU_0003",
            "avg_attendance": 40.0,
            "avg_assignment_grade": 40.0,
            "attendance_trend": -0.8
        }
    ]

    sample_df = pd.DataFrame(sample_data)
    X, _ = predictor.preprocess_data(sample_df)
    predictions, probabilities = predictor.generate_predictions(X)

    response_data = []
    for i, student in enumerate(sample_data):
        probability = probabilities[i]
        predicted_dropout = predictions[i]
        risk_level = get_risk_level(probability)
        confidence = max(probability, 1 - probability)
        recommendations = get_recommendations(probability, student)

        response_data.append(PredictionResponse(
            student_id=student["student_id"],
            dropout_probability=probability,
            risk_level=risk_level,
            predicted_dropout=predicted_dropout,
            confidence=confidence,
            recommendations=recommendations
        ))

    summary = {
        "total_students": len(sample_data),
        "high_risk": sum(1 for r in response_data if r.risk_level == "HIGH"),
        "medium_risk": sum(1 for r in response_data if r.risk_level == "MEDIUM"),
        "low_risk": sum(1 for r in response_data if r.risk_level == "LOW")
    }

    return BulkPredictionResponse(predictions=response_data, summary=summary)

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
