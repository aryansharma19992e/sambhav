# Test the ML API endpoints
import requests
import json

# Base URL for the ML API
BASE_URL = "http://localhost:8000"

def test_health_endpoint():
    """Test the health check endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        print("Health Check:")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        print("-" * 50)
    except Exception as e:
        print(f"Error testing health endpoint: {e}")

def test_single_prediction():
    """Test single student prediction"""
    try:
        test_student = {
            "avg_assignment_score": 75.0,
            "attendance_trend": -0.2,
            "avg_attendance": 85.0
        }
        
        response = requests.post(f"{BASE_URL}/predict", json=test_student)
        print("Single Prediction:")
        print(f"Status Code: {response.status_code}")
        print(f"Input: {test_student}")
        print(f"Response: {response.json()}")
        print("-" * 50)
    except Exception as e:
        print(f"Error testing single prediction: {e}")

def test_bulk_prediction():
    """Test bulk prediction"""
    try:
        test_students = [
            {
                "student_id": "STU_001",
                "avg_assignment_score": 85.0,
                "attendance_trend": 0.1,
                "avg_attendance": 90.0
            },
            {
                "student_id": "STU_002", 
                "avg_assignment_score": 65.0,
                "attendance_trend": -0.3,
                "avg_attendance": 70.0
            }
        ]
        
        response = requests.post(f"{BASE_URL}/predict/bulk", json={"students": test_students})
        print("Bulk Prediction:")
        print(f"Status Code: {response.status_code}")
        print(f"Input: {len(test_students)} students")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        print("-" * 50)
    except Exception as e:
        print(f"Error testing bulk prediction: {e}")

if __name__ == "__main__":
    print("Testing ML API Endpoints...")
    print("=" * 50)
    
    test_health_endpoint()
    test_single_prediction()
    test_bulk_prediction()
    
    print("API Documentation available at: http://localhost:8000/docs")
