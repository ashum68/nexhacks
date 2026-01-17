# Glimpse MVP - 24-Hour Hackathon Technical Specification

## Goal

Build working proof-of-concept: capture video, apply real-time face masking, deliver privacy-compliant highlights via web portal.

---

## Core Features

### 1. Video Capture
- Single camera feed (webcam or test video)
- 720p minimum
- 15-30 FPS
- Local storage

### 2. Face Detection & Recognition
- Detect all faces in frame
- Identify one pre-registered target child
- 10-15 FPS processing
- Handle 2-10 faces per frame

### 3. Privacy Masking
- Gaussian blur on all non-target faces
- Real-time processing (< 200ms latency)
- Target child face remains clear
- Handle 5+ faces simultaneously

### 4. Highlight Detection
- Time-based: 10-second clip every 5 minutes
- Motion-based: detect target child activity
- Store metadata (timestamp, activity level)
- Only save masked video

### 5. Parent Portal
- Single-page web app
- Simple login (one hardcoded account)
- Gallery view with thumbnails
- Video playback
- Date filter
- Mobile-responsive

---

## Architecture

```
Edge Device (Local)
  Camera → AI Pipeline → Local Storage → Upload
    ↓
  [Detection → Recognition → Masking → Highlights]

Backend (Flask)
  API Server ↔ SQLite DB ↔ File Storage

Frontend (React)
  Login → Gallery → Video Player
```

---

## Technology Stack

### AI Pipeline
- Python 3.10+
- OpenCV (video capture/processing)
- MediaPipe (face detection)
- face_recognition (face recognition)
- NumPy, Pillow

### Backend
- Flask (Python)
- SQLite
- Local filesystem storage

### Frontend
- React + Vite
- TailwindCSS
- Axios
- HTML5 video player

### Infrastructure
- All local development
- No cloud dependencies

---

## Component Specifications

### Video Capture Module
**Functions:**
- `initialize_camera() → camera object`
- `capture_frame() → frame, timestamp`
- `release_camera() → cleanup`

**Requirements:**
- 720p stable video
- 15+ FPS
- 60+ minute recording capability

---

### Face Detection Module
**Functions:**
- `detect_faces(frame) → [(x, y, w, h), ...]`
- `encode_face(face_region) → embedding`

**Requirements:**
- 95%+ detection rate (frontal faces)
- < 100ms per frame
- Handle 2-10 faces
- Minimal false positives

**Model:** MediaPipe Face Detection

---

### Face Recognition Module
**Functions:**
- `register_target_child(photos) → store embeddings`
- `is_target_child(face_embedding) → bool, confidence`

**Requirements:**
- 90%+ accuracy
- < 50ms per comparison
- Works with different angles/lighting

**Library:** face_recognition (dlib backend)

---

### Privacy Masking Module
**Functions:**
- `apply_mask(frame, face_locations, is_target_flags) → masked_frame`

**Method:**
- Gaussian blur (51x51+ kernel)
- Rectangular region around face
- Extend mask by 20% (hair/ears)

**Requirements:**
- Non-target faces unrecognizable
- Target face clear
- < 100ms per frame
- Non-reversible blur

---

### Highlight Detection Module
**Functions:**
- `detect_motion(current_frame, previous_frame) → motion_score`
- `should_save_clip(timestamp, motion_score, child_visible) → bool`
- `extract_clip(start_time, end_time) → video_file`

**Rules:**
1. Time-based: every 5 min, save 10-second clip
2. Motion-based: significant target child movement
3. Visibility: only if target child visible

**Requirements:**
- 5-10 highlights per hour
- 5-15 seconds per clip
- Target visible in 80%+ of clips

---

### Backend API

**Database Schema (SQLite):**

```sql
users:
  id, email (unique), password_hash, child_name, created_at

highlights:
  id, user_id, video_filename, thumbnail_filename,
  timestamp, duration_seconds, activity_level,
  uploaded_at, metadata (JSON)
```

**Endpoints:**

```
POST   /api/auth/login
  Body: { email, password }
  Response: { token, user_id }

GET    /api/highlights?user_id=123&date=2026-01-17
  Response: { highlights: [...] }

GET    /api/highlights/:id/video
  Response: Video file (MP4)

POST   /api/highlights/upload
  Body: FormData (video + metadata)
  Response: { highlight_id }

GET    /api/user/profile
  Headers: Authorization: Bearer {token}
  Response: { user, child_name, stats }
```

**Requirements:**
- Working authentication
- Video upload/storage
- Highlight retrieval
- Video streaming
- < 500ms response (excluding video)

---

### Parent Portal

**Pages:**

1. **Login**
   - Email + password
   - Basic validation

2. **Gallery**
   - 3-column grid (desktop)
   - Thumbnail: date, time, duration
   - Click to play
   - Date filter

3. **Video Player**
   - Modal overlay
   - Play/pause controls
   - Timestamp display

**Requirements:**
- Mobile-responsive
- < 2s load time
- Smooth playback

---

## Data Flow

1. **Setup** (one-time)
   - Upload 3-5 child photos
   - Generate face embeddings
   - Create parent account

2. **Recording** (continuous)
   - Capture frames (15-30 FPS)
   - Detect faces → Recognize target → Apply masking
   - Store masked frames
   - Detect highlights in parallel

3. **Processing** (every 5-10 min)
   - Extract highlight clips
   - Encode to MP4 (H.264)
   - Generate thumbnail
   - Add metadata

4. **Upload** (every 10 min)
   - Upload clips to backend
   - Store metadata in DB
   - Delete local raw footage

5. **Viewing** (on-demand)
   - Parent logs in
   - Retrieve highlights from DB
   - Stream video on click

---

## Success Criteria

**Must demonstrate:**
- Multiple people in frame
- Real-time face blurring
- Target child face clear
- All other faces unrecognizable
- No manual intervention
- Automatic highlight generation
- Parent can view in browser
- < 200ms processing latency
- 1+ hour continuous operation

---

## Timeline (24 Hours)

**0-2h: Setup**
- Repository, dependencies
- Test camera access
- Project structure

**2-6h: AI Pipeline**
- Face detection (MediaPipe)
- Face recognition
- Masking function
- **MILESTONE:** Masked video output

**6-10h: Highlights**
- Time-based extraction
- Motion detection
- MP4 encoding
- **MILESTONE:** Auto highlight generation

**10-14h: Backend**
- Flask setup
- SQLite schema
- Auth endpoints
- Upload/retrieval endpoints
- **MILESTONE:** Working API

**14-20h: Frontend**
- React + Vite setup
- Login page
- Gallery view
- Video player
- API integration
- **MILESTONE:** Working portal

**20-22h: Integration**
- End-to-end testing
- Bug fixes
- Performance optimization

**22-24h: Demo Prep**
- Demo script
- Sample data
- Practice walkthrough

---

## Deferred Features

- Hardware acceleration
- Model optimization
- Advanced AI (emotion, activity classification)
- Production security (OAuth2, encryption)
- Scalability (load balancing, CDN)
- UX enhancements (notifications, downloads)
- Compliance documentation

---

## Risks & Mitigation

**Face detection accuracy poor**
- Use MediaPipe, face_recognition
- Test with good lighting
- Backup test videos

**Processing too slow**
- Lower resolution (720p → 480p)
- Reduce FPS (30 → 15)
- Pre-recorded video for demo

**Video encoding issues**
- Standard H.264 MP4
- Test multiple browsers
- VLC backup

**Integration failures**
- Clear interfaces
- Test components independently
- Mock data

**Scope creep**
- Stick to this spec
- Core demo: masking + portal

**Live demo fails**
- Pre-recorded backup
- Test setup multiple times

---

## Testing Checklist

**AI Pipeline:**
- 1 person → face detected
- 5 people → only target unmasked
- No target → all masked
- 5+ min run → no crashes

**Backend:**
- Login → returns token
- Upload → file saved
- Get highlights → correct list
- Stream → plays correctly

**Frontend:**
- Login → redirects
- Dashboard → shows thumbnails
- Click video → plays
- Mobile → responsive

**End-to-End:**
- Record → highlight generated
- Upload → appears in portal
- View → plays successfully

---

## Constraints

- 24 hours development
- 1-3 developers
- Standard laptop (no AI hardware)
- $0 budget
- Local development only

**Assumptions:**
- Python/Node.js experience
- Adequate lighting
- Target child visible most of time
- Simulated classroom
- Single child per account

---

## Demo Script (3 minutes)

1. Show classroom with 3-5 people
2. Point to camera capturing video
3. Show live view with real-time masking
4. Target child clear, others blurred
5. Run system 30-60 seconds
6. Open parent portal
7. Show highlight in gallery
8. Play masked video
9. Emphasize: automated, private, no manual work

---

## Critical Requirement

**Real-time face masking with accurate target child identification must work.**

This is the core value. Everything else is secondary.
