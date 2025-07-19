import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, roc_curve
from sklearn.tree import DecisionTreeClassifier
import xgboost as xgb
import lightgbm as lgb
from imblearn.over_sampling import SMOTE
from imblearn.under_sampling import RandomUnderSampler
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import joblib
import warnings
warnings.filterwarnings('ignore')

class StudentDropoutPredictor:
    """
    A comprehensive ML model to predict student dropout risk based on 
    attendance and assignment grades.
    """
    
    def __init__(self):
        self.models = {}
        self.scaler = StandardScaler()
        self.best_model = None
        self.feature_names = []
        
    def load_data(self, file_path=None):
        """
        Load student data. If no file provided, generate synthetic data for demonstration.
        """
        if file_path and pd.io.common.file_exists(file_path):
            return pd.read_csv(file_path)
        else:
            # Generate synthetic data for demonstration
            print("No data file found. Generating synthetic dataset...")
            return self._generate_synthetic_data()
    
    def _generate_synthetic_data(self, n_students=1000):
        """
        Generate simplified synthetic student data.
        """
        np.random.seed(42)

        data = []

        for i in range(n_students):
            student_id = f"STU_{i+1:04d}"

            # Generate base attendance for the student (randomized initial value)
            avg_attendance = np.random.uniform(50, 100)  # Between 50% and 100%

            # Generate assignment scores (10 assignments, range 0-100)
            assignment_scores = np.random.randint(0, 101, size=10)
            avg_assignment_score = np.mean(assignment_scores)  # Calculate average assignment score

            # Generate attendance trend (random slope between -1 and 1)
            attendance_trend = np.random.uniform(-1, 1)

            # Determine dropout (target variable)
            dropout_risk_score = (
                (100 - avg_assignment_score) * 0.5 +
                max(0, -attendance_trend) * 0.5
            )

            # Convert to binary with some randomness
            dropout_probability = 1 / (1 + np.exp(-(dropout_risk_score - 50) / 10))
            dropped_out = np.random.random() < dropout_probability

            student_data = {
                'student_id': student_id,
                'avg_assignment_score': avg_assignment_score,
                'attendance_trend': attendance_trend,
                'avg_attendance': avg_attendance,  # Replace monthly attendance with average attendance
                'dropped_out': int(dropped_out)
            }

            data.append(student_data)

        return pd.DataFrame(data)
    
    def preprocess_data(self, df):
        """
        Preprocess the data for training or prediction.
        """
        # Separate features and target
        feature_cols = [col for col in df.columns if col not in ['student_id', 'dropped_out']]
        X = df[feature_cols].copy()

        # Handle missing values
        X = X.fillna(X.median())

        # Debugging: Check the structure of the dataframe before preprocessing
        print("Dataframe before preprocessing:")
        print(df.head())

        # Store feature names
        self.feature_names = X.columns.tolist()

        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        X_scaled = pd.DataFrame(X_scaled, columns=self.feature_names)

        # Debugging: Check the structure of the features after scaling
        print("Features after scaling:")
        print(X_scaled.head())

        # If 'dropped_out' exists, separate it as the target variable
        y = df['dropped_out'].copy() if 'dropped_out' in df.columns else None

        return X_scaled, y
    
    def train_models(self, X, y):
        """
        Train multiple ML models and compare their performance.
        """
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

        # Handle class imbalance using SMOTE
        smote = SMOTE(random_state=42)
        X_train_balanced, y_train_balanced = smote.fit_resample(X_train, y_train)

        # Define models with stochastic elements
        models = {
            'Random Forest': RandomForestClassifier(n_estimators=100, random_state=None, bootstrap=True),
            'Gradient Boosting': GradientBoostingClassifier(random_state=None, subsample=0.8),
            'XGBoost': xgb.XGBClassifier(random_state=None, eval_metric='logloss', subsample=0.8),
            'LightGBM': lgb.LGBMClassifier(random_state=None, verbose=-1, bagging_fraction=0.8)
        }

        # Train and evaluate models
        results = {}

        for name, model in models.items():
            print(f"\nTraining {name}...")

            # Train model
            model.fit(X_train_balanced, y_train_balanced)

            # Predictions
            y_pred = model.predict(X_test)
            y_pred_proba = model.predict_proba(X_test)[:, 1]

            # Metrics
            auc_score = roc_auc_score(y_test, y_pred_proba)
            cv_scores = cross_val_score(model, X_train_balanced, y_train_balanced, cv=5, scoring='roc_auc')

            results[name] = {
                'model': model,
                'auc_score': auc_score,
                'cv_mean': cv_scores.mean(),
                'cv_std': cv_scores.std(),
                'y_test': y_test,
                'y_pred': y_pred,
                'y_pred_proba': y_pred_proba
            }

            print(f"AUC Score: {auc_score:.4f}")
            print(f"CV AUC: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")

        # Select best model
        best_model_name = max(results.keys(), key=lambda x: results[x]['auc_score'])
        self.best_model = results[best_model_name]['model']
        self.models = results

        print(f"\nBest Model: {best_model_name} (AUC: {results[best_model_name]['auc_score']:.4f})")

        return results, X_test, y_test
    
    def hyperparameter_tuning(self, X, y, model_name='Random Forest'):
        """
        Perform hyperparameter tuning for the specified model.
        """
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
        
        # Apply SMOTE
        smote = SMOTE(random_state=42)
        X_train_balanced, y_train_balanced = smote.fit_resample(X_train, y_train)
        
        if model_name == 'Random Forest':
            param_grid = {
                'n_estimators': [100, 200, 300],
                'max_depth': [10, 20, None],
                'min_samples_split': [2, 5, 10],
                'min_samples_leaf': [1, 2, 4]
            }
            model = RandomForestClassifier(random_state=42)
        
        elif model_name == 'XGBoost':
            param_grid = {
                'n_estimators': [100, 200, 300],
                'max_depth': [3, 6, 9],
                'learning_rate': [0.01, 0.1, 0.2],
                'subsample': [0.8, 0.9, 1.0]
            }
            model = xgb.XGBClassifier(random_state=42, eval_metric='logloss')
        
        else:
            print(f"Hyperparameter tuning not implemented for {model_name}")
            return None
        
        print(f"Performing hyperparameter tuning for {model_name}...")
        grid_search = GridSearchCV(model, param_grid, cv=5, scoring='roc_auc', n_jobs=-1, verbose=1)
        grid_search.fit(X_train_balanced, y_train_balanced)
        
        print(f"Best parameters: {grid_search.best_params_}")
        print(f"Best CV score: {grid_search.best_score_:.4f}")
        
        # Update best model
        self.best_model = grid_search.best_estimator_
        
        return grid_search
    
    def generate_predictions(self, X):
        """
        Generate predictions and probabilities for new data.
        """
        if self.best_model is None:
            raise ValueError("No model trained yet. Please train a model first.")

        # Ensure input data matches the feature names used during training
        if not all(feature in X.columns for feature in self.feature_names):
            raise ValueError("Input data is missing required features.")

        # Reorder columns to match the training feature order
        X = X[self.feature_names]

        # Scale input data using the trained scaler
        X_scaled = self.scaler.transform(X)

        # Generate predictions and probabilities
        predictions = self.best_model.predict(X_scaled)
        probabilities = self.best_model.predict_proba(X_scaled)[:, 1]

        return predictions, probabilities
    
    def feature_importance_analysis(self):
        """
        Analyze feature importance from the best model.
        """
        if self.best_model is None:
            raise ValueError("No model trained yet. Please train a model first.")
        
        if hasattr(self.best_model, 'feature_importances_'):
            importance_df = pd.DataFrame({
                'feature': self.feature_names,
                'importance': self.best_model.feature_importances_
            }).sort_values('importance', ascending=False)
            
            return importance_df
        else:
            print("Feature importance not available for this model type.")
            return None
    
    def save_model(self, filepath):
        """
        Save the trained model and scaler.
        """
        model_data = {
            'best_model': self.best_model,
            'scaler': self.scaler,
            'feature_names': self.feature_names
        }
        joblib.dump(model_data, filepath)
        print(f"Model saved to {filepath}")
    
    def load_model(self, filepath):
        """
        Load a previously trained model.
        """
        model_data = joblib.load(filepath)
        self.best_model = model_data['best_model']
        self.scaler = model_data['scaler']
        self.feature_names = model_data['feature_names']
        print(f"Model loaded from {filepath}")

# Visualization functions
def create_visualizations(predictor, results, X_test, y_test):
    """
    Create comprehensive visualizations for the ML model results.
    """
    
    # 1. Model Comparison
    model_names = list(results.keys())
    auc_scores = [results[name]['auc_score'] for name in model_names]
    cv_means = [results[name]['cv_mean'] for name in model_names]
    
    fig = make_subplots(
        rows=2, cols=2,
        subplot_titles=('Model AUC Comparison', 'ROC Curves', 'Feature Importance', 'Confusion Matrix'),
        specs=[[{"secondary_y": False}, {"secondary_y": False}],
               [{"secondary_y": False}, {"secondary_y": False}]]
    )
    
    # Model comparison bar chart
    fig.add_trace(
        go.Bar(x=model_names, y=auc_scores, name='Test AUC', marker_color='lightblue'),
        row=1, col=1
    )
    fig.add_trace(
        go.Bar(x=model_names, y=cv_means, name='CV AUC', marker_color='lightgreen'),
        row=1, col=1
    )
    
    # ROC Curves
    for name in model_names:
        fpr, tpr, _ = roc_curve(results[name]['y_test'], results[name]['y_pred_proba'])
        fig.add_trace(
            go.Scatter(x=fpr, y=tpr, name=f'{name} (AUC: {results[name]["auc_score"]:.3f})', mode='lines'),
            row=1, col=2
        )
    
    # Diagonal line for random classifier
    fig.add_trace(
        go.Scatter(x=[0, 1], y=[0, 1], mode='lines', line=dict(dash='dash'), name='Random'),
        row=1, col=2
    )
    
    # Feature importance
    importance_df = predictor.feature_importance_analysis()
    if importance_df is not None:
        top_features = importance_df.head(10)
        fig.add_trace(
            go.Bar(x=top_features['importance'], y=top_features['feature'], orientation='h'),
            row=2, col=1
        )
    
    # Confusion matrix for best model
    best_model_name = max(results.keys(), key=lambda x: results[x]['auc_score'])
    cm = confusion_matrix(results[best_model_name]['y_test'], results[best_model_name]['y_pred'])
    
    fig.add_trace(
        go.Heatmap(z=cm, x=['Not Dropped', 'Dropped'], y=['Not Dropped', 'Dropped'], 
                   colorscale='Blues', showscale=False),
        row=2, col=2
    )
    
    fig.update_layout(height=800, title_text="Student Dropout Prediction - Model Analysis")
    fig.show()
    
    return fig

def create_risk_analysis_dashboard(df, predictions, probabilities):
    """
    Create a dashboard for risk analysis.
    """
    # Add predictions to dataframe
    df_viz = df.copy()
    df_viz['predicted_dropout'] = predictions
    df_viz['dropout_probability'] = probabilities
    df_viz['risk_level'] = pd.cut(probabilities, bins=[0, 0.3, 0.7, 1.0], 
                                  labels=['Low Risk', 'Medium Risk', 'High Risk'])
    
    fig = make_subplots(
        rows=2, cols=2,
        subplot_titles=('Risk Distribution', 'Attendance vs Assignment Grades', 
                       'Risk by Attendance', 'Probability Distribution'),
        specs=[[{"secondary_y": False}, {"secondary_y": False}],
               [{"secondary_y": False}, {"secondary_y": False}]]
    )
    
    # Risk distribution
    risk_counts = df_viz['risk_level'].value_counts()
    fig.add_trace(
        go.Pie(labels=risk_counts.index, values=risk_counts.values, name="Risk Distribution"),
        row=1, col=1
    )
    
    # Attendance vs Assignment grades colored by risk
    fig.add_trace(
        go.Scatter(x=df_viz['avg_attendance'], y=df_viz['avg_assignment_grade'],
                   mode='markers', marker=dict(color=df_viz['dropout_probability'], 
                                             colorscale='Reds', size=8),
                   text=df_viz['risk_level'], name="Students"),
        row=1, col=2
    )
    
    # Risk by attendance bins
    attendance_bins = pd.cut(df_viz['avg_attendance'], bins=5)
    risk_by_attendance = df_viz.groupby(attendance_bins)['dropout_probability'].mean()
    fig.add_trace(
        go.Bar(x=[str(x) for x in risk_by_attendance.index], y=risk_by_attendance.values),
        row=2, col=1
    )
    
    # Probability distribution
    fig.add_trace(
        go.Histogram(x=df_viz['dropout_probability'], nbinsx=20, name="Probability Distribution"),
        row=2, col=2
    )
    
    fig.update_layout(height=800, title_text="Student Dropout Risk Analysis Dashboard")
    fig.show()
    
    return fig, df_viz

if __name__ == "__main__":
    # Example usage
    print("Student Dropout Prediction Model")
    print("=" * 50)
    
    # Initialize predictor
    predictor = StudentDropoutPredictor()
    
    # Load data (will generate synthetic data if no file provided)
    df = predictor.load_data()
    print(f"Loaded dataset with {len(df)} students")
    print(f"Dropout rate: {df['dropped_out'].mean():.2%}")
    
    # Preprocess data
    X, y = predictor.preprocess_data(df)
    
    # Train models
    results, X_test, y_test = predictor.train_models(X, y)
    
    # Generate predictions for all data
    predictions, probabilities = predictor.generate_predictions(X)
    
    # Feature importance analysis
    importance_df = predictor.feature_importance_analysis()
    if importance_df is not None:
        print("\nTop 10 Most Important Features:")
        print(importance_df.head(10))
    
    # Save model
    predictor.save_model('student_dropout_model.pkl')
    
    print("\nModel training completed successfully!")
    print("Use the visualization functions to create charts and dashboards.")
