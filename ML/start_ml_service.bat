@echo off
echo Starting ML FastAPI Service...
cd /d "c:\Users\danus\OneDrive\Desktop\JPMC\Team-15\ML"
pip install -r requirements.txt
echo Dependencies installed. Starting FastAPI server...
python main.py
