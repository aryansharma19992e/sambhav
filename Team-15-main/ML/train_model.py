import pandas as pd
import numpy as np
from student_dropout_predictor import StudentDropoutPredictor

if __name__ == "__main__":
    print("Training Student Dropout Prediction Model...")
    predictor = StudentDropoutPredictor()

    # Generate synthetic data and train the model
    df = predictor.load_data()
    X, y = predictor.preprocess_data(df)
    results, X_test, y_test = predictor.train_models(X, y)

    # Save the trained model
    predictor.save_model('student_dropout_model.pkl')
    print("Model training complete. Saved as 'student_dropout_model.pkl'")
