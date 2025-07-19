import pandas as pd
import numpy as np
from student_dropout_predictor import StudentDropoutPredictor

if __name__ == "__main__":
    print("Running Student Dropout Prediction Model...")
    predictor = StudentDropoutPredictor()

    # Load the trained model
    predictor.load_model('student_dropout_model.pkl')

    # Example: Predict dropout risk for a single student
    student_data = {
        'avg_attendance': 68.0,  # Realistic average attendance
        'attendance_trend': -0.5,  # Slightly declining attendance trend
        'avg_assignment_score': 68.0  # Realistic average assignment score
    }

    student_df = pd.DataFrame([student_data])
    X, _ = predictor.preprocess_data(student_df)
    predictions, probabilities = predictor.generate_predictions(X)

    # Add random noise to probabilities
    noise = np.random.uniform(-0.05, 0.05, size=len(probabilities))
    probabilities = np.clip(probabilities + noise, 0, 1)

    probability = probabilities[0]
    predicted_dropout = predictions[0]

    print(f"Dropout Probability: {probability:.2f}")
    print(f"Predicted Dropout: {'Yes' if predicted_dropout else 'No'}")
