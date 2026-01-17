# Glimpse Project Structure

## Overview

Three main components:
1. **ai-pipeline** - Python-based video processing and AI
2. **backend** - Flask API server
3. **frontend** - React web portal

---

## Root Directory Structure

```
glimpse/
├── ai-pipeline/          # Edge device AI processing
├── backend/              # Flask API server
├── frontend/             # React web portal
├── shared/               # Shared utilities/configs
├── .gitignore
├── README.md
└── requirements.txt      # Python dependencies (root level)
```

---

## AI Pipeline Structure

```
ai-pipeline/
├── src/
│   ├── capture/
│   │   ├── __init__.py
│   │   └── camera.py              # Video capture module
│   │
│   ├── detection/
│   │   ├── __init__.py
│   │   ├── face_detector.py       # Face detection (MediaPipe)
│   │   └── face_recognizer.py     # Face recognition (face_recognition)
│   │
│   ├── masking/
│   │   ├── __init__.py
│   │   └── privacy_mask.py        # Blur masking logic
│   │
│   ├── highlights/
│   │   ├── __init__.py
│   │   ├── detector.py             # Highlight detection logic
│   │   └── extractor.py            # Video clip extraction
│   │
│   ├── pipeline/
│   │   ├── __init__.py
│   │   └── processor.py           # Main pipeline orchestrator
│   │
│   └── utils/
│       ├── __init__.py
│       ├── video_encoder.py       # MP4 encoding
│       └── storage.py              # Local file management
│
├── data/
│   ├── registered/                # Target child reference photos
│   ├── recordings/                 # Raw captured frames (temporary)
│   ├── highlights/                 # Processed highlight clips
│   └── embeddings/                 # Stored face embeddings
│
├── config/
│   └── config.yaml                 # Pipeline configuration
│
├── scripts/
│   ├── register_child.py          # One-time child registration
│   └── run_pipeline.py            # Main entry point
│
├── tests/
│   └── test_pipeline.py
│
├── requirements.txt
└── README.md
```

**Key Files:**

`ai-pipeline/src/pipeline/processor.py` - Main orchestrator:
```python
class VideoProcessor:
    def __init__(self, target_child_id):
        self.camera = Camera()
        self.detector = FaceDetector()
        self.recognizer = FaceRecognizer(target_child_id)
        self.masker = PrivacyMasker()
        self.highlight_detector = HighlightDetector()
    
    def process_frame(self, frame):
        # Detection → Recognition → Masking → Highlight check
        pass
    
    def run(self):
        # Main loop
        pass
```

`ai-pipeline/scripts/register_child.py` - Child registration:
```python
# Upload 3-5 photos, generate embeddings, save to data/embeddings/
```

`ai-pipeline/config/config.yaml`:
```yaml
camera:
  resolution: [1280, 720]
  fps: 15
  
detection:
  model: "mediapipe"
  confidence: 0.5
  
masking:
  blur_kernel: 51
  mask_padding: 0.2
  
highlights:
  interval_seconds: 300  # 5 minutes
  clip_duration: 10
  motion_threshold: 0.3
```

---

## Backend Structure

```
backend/
├── app/
│   ├── __init__.py                # Flask app factory
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py                # User model
│   │   └── highlight.py           # Highlight model
│   │
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py                # /api/auth/*
│   │   ├── highlights.py          # /api/highlights/*
│   │   └── user.py                 # /api/user/*
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py        # Authentication logic
│   │   ├── video_service.py       # Video upload/streaming
│   │   └── storage_service.py     # File storage management
│   │
│   ├── database/
│   │   ├── __init__.py
│   │   ├── db.py                  # Database connection
│   │   └── migrations/            # SQLite schema
│   │
│   └── utils/
│       ├── __init__.py
│       ├── validators.py          # Input validation
│       └── errors.py              # Error handlers
│
├── uploads/
│   ├── videos/                    # Stored video files
│   └── thumbnails/                # Thumbnail images
│
├── instance/
│   └── database.db                 # SQLite database file
│
├── config/
│   └── config.py                   # Flask configuration
│
├── tests/
│   └── test_api.py
│
├── requirements.txt
├── run.py                          # Development server entry
└── README.md
```

**Key Files:**

`backend/app/__init__.py` - Flask app:
```python
from flask import Flask
from app.database.db import init_db
from app.routes import auth, highlights, user

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.config.Config')
    init_db(app)
    
    app.register_blueprint(auth.bp)
    app.register_blueprint(highlights.bp)
    app.register_blueprint(user.bp)
    
    return app
```

`backend/app/database/db.py`:
```python
import sqlite3
from flask import g

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect('instance/database.db')
    return g.db

def init_db(app):
    # Create tables
    pass
```

`backend/run.py`:
```python
from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

---

## Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   │
│   │   ├── Gallery/
│   │   │   ├── Gallery.jsx
│   │   │   ├── VideoThumbnail.jsx
│   │   │   └── DateFilter.jsx
│   │   │
│   │   ├── VideoPlayer/
│   │   │   ├── VideoPlayer.jsx
│   │   │   └── VideoPlayer.css
│   │   │
│   │   └── Layout/
│   │       ├── Header.jsx
│   │       └── Layout.jsx
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   └── DashboardPage.jsx
│   │
│   ├── services/
│   │   ├── api.js                 # Axios API client
│   │   └── auth.js                # Auth token management
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useHighlights.js
│   │
│   ├── utils/
│   │   └── constants.js           # API endpoints, etc.
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
│   └── index.html
│
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

**Key Files:**

`frontend/src/services/api.js`:
```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

`frontend/src/App.jsx`:
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Shared Configuration

```
shared/
├── config/
│   └── api_config.json            # Shared API endpoints, constants
└── scripts/
    └── setup.sh                   # Initial setup script
```

---

## Configuration Files

### Root `.gitignore`
```
# Python
__pycache__/
*.py[cod]
*.so
.Python
venv/
env/
*.db
*.sqlite

# Node
node_modules/
dist/
build/
.env

# Data
ai-pipeline/data/recordings/*
ai-pipeline/data/highlights/*
backend/uploads/*

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
```

### Root `requirements.txt` (Python dependencies)
```
# AI Pipeline
opencv-python==4.8.1
mediapipe==0.10.7
face-recognition==1.3.0
numpy==1.24.3
Pillow==10.1.0
pyyaml==6.0.1

# Backend
Flask==3.0.0
Flask-CORS==4.0.0
werkzeug==3.0.1
```

### `frontend/package.json`
```json
{
  "name": "glimpse-frontend",
  "version": "0.1.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8",
    "tailwindcss": "^3.3.6",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

---

## Development Workflow

### 1. Setup (Hour 0-2)
```bash
# Create structure
mkdir -p glimpse/{ai-pipeline,backend,frontend,shared}
cd glimpse

# AI Pipeline setup
cd ai-pipeline
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
mkdir -p data/{registered,recordings,highlights,embeddings}
mkdir -p src/{capture,detection,masking,highlights,pipeline,utils}

# Backend setup
cd ../backend
python -m venv venv
source venv/bin/activate
pip install -r ../requirements.txt
mkdir -p app/{models,routes,services,database,utils}
mkdir -p uploads/{videos,thumbnails}
mkdir instance

# Frontend setup
cd ../frontend
npm create vite@latest . -- --template react
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Running Components

**AI Pipeline:**
```bash
cd ai-pipeline
source venv/bin/activate
python scripts/run_pipeline.py
```

**Backend:**
```bash
cd backend
source venv/bin/activate
python run.py
# Runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

---

## Communication Between Components

### AI Pipeline → Backend
- HTTP POST to `http://localhost:5000/api/highlights/upload`
- Multipart form data with video file + metadata
- After upload, delete local raw footage

### Frontend → Backend
- REST API calls via Axios
- JWT token in Authorization header
- CORS enabled on Flask for localhost:5173

### Data Flow
```
AI Pipeline (localhost) 
  → Uploads highlights via HTTP
  → Backend stores in uploads/videos/
  → Backend saves metadata to SQLite

Frontend (localhost:5173)
  → GET /api/highlights
  → Backend queries SQLite
  → Returns JSON with video URLs
  → Frontend streams from GET /api/highlights/:id/video
```

---

## File Naming Conventions

- **Python**: `snake_case.py`
- **React**: `PascalCase.jsx` for components, `camelCase.js` for utilities
- **Config**: `kebab-case.yaml` or `snake_case.py`
- **Database**: `snake_case` tables and columns

---

## Key Design Decisions

1. **Separate repos/components** - Easier parallel development
2. **SQLite for MVP** - No database server needed
3. **Local filesystem storage** - No S3/cloud needed
4. **Shared config** - API endpoints in one place
5. **Simple auth** - JWT tokens, no OAuth complexity
6. **No Docker** - Direct local execution for speed

---

## Quick Start Checklist

- [ ] Create directory structure
- [ ] Set up Python virtual environments (ai-pipeline, backend)
- [ ] Install Python dependencies
- [ ] Set up React + Vite frontend
- [ ] Install Node dependencies
- [ ] Create Flask app structure
- [ ] Create SQLite database schema
- [ ] Test camera access
- [ ] Verify all three components can run simultaneously
