# Team-15 - MERN Stack with ML Integration

## Project Structure

- **Frontend**: Next.js React application (`/frontend`)
- **Backend**: Node.js Express API (`/backend`) 
- **ML Service**: FastAPI Python service (`/ML`)

## Quick Start

### Option 1: Use the automated startup script
Double-click `start_project.bat` to start all services automatically.

### Option 2: Use npm scripts
```bash
# Install all dependencies
npm run install:all

# Start all services in development mode
npm run dev
```

### Option 3: Manual startup
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev

# Terminal 3 - ML Service
cd ML
pip install -r requirements.txt
python main.py
```

## Service URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **ML API**: http://localhost:8000
- **ML API Documentation**: http://localhost:8000/docs

## ML Service Features

The ML service provides student dropout prediction capabilities:

- `/predict` - Single student prediction
- `/predict/bulk` - Bulk predictions
- `/health` - Service health check
- `/docs` - Interactive API documentation

## Development

### VS Code Tasks
Use Ctrl+Shift+P and type "Tasks: Run Task" to access:
- Start All Services
- Start Backend Only
- Start Frontend Only  
- Start ML API Only
- Install All Dependencies

### Requirements
- Node.js (for frontend/backend)
- Python 3.x (for ML service)
- MongoDB (for data persistence)