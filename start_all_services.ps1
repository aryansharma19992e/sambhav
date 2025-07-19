# Start all services for the MERN + ML project
Write-Host "Starting MERN + ML Services..." -ForegroundColor Green

# Function to start a service in a new window
function Start-ServiceInNewWindow {
    param(
        [string]$Title,
        [string]$Command,
        [string]$WorkingDirectory
    )
    
    Write-Host "Starting $Title..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$WorkingDirectory'; $Command" -WindowStyle Normal
}

# Start MongoDB (if needed - uncomment if you have MongoDB locally)
# Write-Host "Starting MongoDB..." -ForegroundColor Yellow
# Start-Process "mongod" -WindowStyle Minimized

# Start Backend (Node.js/Express)
Start-ServiceInNewWindow -Title "Backend Server" -Command "npm run dev" -WorkingDirectory "c:\Users\danus\OneDrive\Desktop\JPMC\Team-15\backend"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start Frontend (Next.js)
Start-ServiceInNewWindow -Title "Frontend Server" -Command "npm run dev" -WorkingDirectory "c:\Users\danus\OneDrive\Desktop\JPMC\Team-15\frontend"

# Wait a bit for frontend to start
Start-Sleep -Seconds 3

# Start ML FastAPI Service
Start-ServiceInNewWindow -Title "ML FastAPI Service" -Command "pip install -r requirements.txt; python main.py" -WorkingDirectory "c:\Users\danus\OneDrive\Desktop\JPMC\Team-15\ML"

Write-Host "`nAll services are starting up!" -ForegroundColor Green
Write-Host "Backend will be available at: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "ML API will be available at: http://localhost:8000" -ForegroundColor Cyan
Write-Host "ML API docs will be available at: http://localhost:8000/docs" -ForegroundColor Cyan

# Keep the main window open
Read-Host "`nPress Enter to exit..."
