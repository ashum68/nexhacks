# Glimpse Frontend Design

## Design Principles

1. **Simplicity** - Minimal clicks to view child's highlights
2. **Clarity** - Clear visual hierarchy, easy to scan
3. **Mobile-first** - Works on phone (primary use case)
4. **Fast** - Quick load times, smooth interactions
5. **Trust** - Clean, professional appearance

---

## User Flows

### Flow 1: Login
```
Landing → Login Form → Validate → Store Token → Redirect to Dashboard
```

### Flow 2: View Highlights
```
Dashboard → Gallery Grid → Click Thumbnail → Video Player Modal → Close → Back to Gallery
```

### Flow 3: Filter Highlights
```
Dashboard → Date Filter → Update Gallery → Show Filtered Results
```

### Flow 4: Teacher Portal (Main Hub)
```
Teacher Login → Teacher Dashboard
  ├→ View Activity (Flow 4a)
  ├→ Manage Cameras (Flow 4b)
  └→ Add Camera (Flow 4c)
```

### Flow 4a: Teacher View Activity
```
Teacher Dashboard → View Classroom List → Select Classroom → 
  See Highlights → View Video → Back to Dashboard
```

### Flow 4b: Teacher Manage Cameras
```
Teacher Dashboard → Camera Management → Select Camera → 
  View Status → Open Settings → Update Settings → Save → Back to Camera List
```

### Flow 4c: Teacher Add New Camera
```
Teacher Dashboard → Camera Management → Add Camera Button → 
  Fill Form → Configure Settings → Register Target Children → 
  Activate Camera → Back to Camera List → Appears in Dashboard
```

### Flow 5: Demo Camera App (Public)
```
Landing / Demo Page → Start Demo → View Live Masking → See Highlight Generation → View Processed Video
```

---

## Page Structure

### 1. Login Page (Public)

**Components:**
- `LoginForm` - Email and password inputs
- `Logo` - Glimpse branding
- `ErrorMessage` - Display authentication errors
- `RememberMe` - Optional checkbox (stores token longer)

**Features:**
- Single form for both parents and teachers
- Role detection after login (redirects to appropriate dashboard)
- Password visibility toggle
- Form validation (email format, required fields)
- Loading state during authentication

**Post-Login Routing:**
- Parent role → `/dashboard` (Parent Dashboard)
- Teacher role → `/teacher` (Teacher Dashboard)
- Invalid credentials → Show error, stay on login page
---

### 2. Parent Dashboard / Gallery Page

**Note:** This is the PARENT view, distinct from Teacher Dashboard

**Components:**
- `Header` - Logo, child name, logout button
- `DateFilter` - Time period buttons (Today, This Week, This Month, All)
- `GalleryGrid` - Responsive grid of thumbnails (1 col mobile, 2 tablet, 3 desktop)
- `VideoThumbnail` - Individual video card with thumbnail, timestamp, duration
- `EmptyState` - "No highlights yet" message when gallery is empty

**Features:**
- Shows highlights for ONE child (parent's registered child)
- Filter highlights by date range
- Click thumbnail to open Video Player Modal
- Auto-refresh or manual refresh for new highlights
- Loading skeleton while fetching highlights

---

### 3. Video Player Modal (Shared Component)

**Note:** Used in both Parent Dashboard and Teacher Portal

**Components:**
- `VideoPlayer` - HTML5 video element with native controls
- `VideoInfo` - Metadata display (timestamp, duration, activity level)
- `CloseButton` - X button in top-right corner
- `Backdrop` - Semi-transparent overlay (click to close)

**Features:**
- Auto-play on open (user preference, default: false)
- Fullscreen support (native browser fullscreen)
- Keyboard controls:
  - Space = play/pause
  - ESC = close modal
  - Arrow keys = seek (if supported)
- Loading spinner while video loads
- Error state if video fails to load
- Responsive sizing (adapts to viewport)

**Usage:**
- Parent: Opens from gallery thumbnail click
- Teacher: Opens from classroom highlights or camera recordings

---

### 4. Teacher Portal / Dashboard

**Components:**
- `Header` - Logo, school name, logout button
- `StatsCards` - Three metric cards: Total Cameras, Active Cameras, Highlights Today
- `ClassroomList` - List of all classrooms with activity status
- `RecentHighlights` - Mini gallery (last 6 highlights across all classrooms)
- `Navigation` - Top navigation bar with links: Dashboard, Cameras, (Settings - future)

**Navigation Structure:**
- Top nav bar (not sidebar) for MVP simplicity
- Links: "Dashboard" | "Cameras" | "Logout"
- Active page highlighted
- Responsive: Hamburger menu on mobile

**Features:**
- View all classrooms at a glance
- See recording status per room (🟢 Active, 🟡 Paused, 🔴 Offline)
- Click classroom card → View that classroom's highlights
- Quick access to recent highlights (click to play)
- Filter by classroom (dropdown) and date (optional for MVP)

**Empty States:**
- No cameras: "No cameras configured. Add your first camera."
- No highlights: "No highlights yet. Check back after recording starts."

---

### 5. Teacher Camera Management Page

**Components:**
- `CameraCard` - Individual camera status card with all info
- `LivePreview` - Thumbnail snapshot (refreshes every 30s, low-res for performance)
- `CameraStatus` - Status indicator: 🟢 Active, 🟡 Paused, 🔴 Offline
- `CameraActions` - Action buttons: View Recordings, Settings, Pause/Resume
- `AddCameraButton` - "Add Camera" button in header (opens Camera Settings Modal in "new" mode)
- `CameraSettingsModal` - Configuration panel (reused for add/edit)

**Camera Status Definitions:**
- **Active (🟢)**: Recording enabled, camera online, processing frames
- **Paused (🟡)**: Recording disabled by teacher, camera still online
- **Offline (🔴)**: Camera hardware disconnected or unreachable

**Features:**
- View all cameras in one place (grid layout, 2 columns desktop)
- Live preview thumbnails (static image, updates every 30 seconds)
- Status indicators with last seen timestamp for offline cameras
- Quick actions per camera (View Recordings, Settings, Pause/Resume)
- Add new camera (opens modal with empty form)
- **Delete camera** (optional, confirm dialog - MVP: can skip, just pause)
- Bulk operations: "Pause All" / "Resume All" buttons (optional for MVP)

**Empty State:**
- "No cameras configured. Click 'Add Camera' to get started."

---

### 6. Teacher Camera Settings Modal

**Note:** Same modal used for both "Add Camera" and "Edit Camera" (mode determined by props)

**Components:**
- `CameraInfoForm` - Name (required), location (required), device ID (auto-generated or manual)
- `RecordingSettings` - Enable toggle, Resolution dropdown, FPS dropdown, Highlight interval dropdown
- `PrivacySettings` - Enable masking toggle, Masking sensitivity slider (0-1)
- `ScheduleSettings` - Enable schedule toggle, Start time, End time, Days checkboxes (Mon-Fri)
- `RegisteredChildrenList` - List of children registered for this camera (read-only for MVP, "Add Child" button opens separate flow)

**Child Registration:**
- Teachers register children per camera (upload 3-5 photos)
- Each camera can have multiple target children
- Registration happens in separate flow/modal (not in settings)
- Settings modal shows list but doesn't allow editing (MVP)

**Form Validation:**
- Name: Required, max 100 characters
- Location: Required, max 200 characters
- Start time must be before end time
- At least one day must be selected if schedule enabled
- Device ID: Required, unique format (e.g., "CAM-101")

**Actions:**
- "Cancel" - Close without saving
- "Save Changes" - Validate and save, close modal, refresh camera list
- "Delete Camera" - Only shown in edit mode, confirm dialog (optional for MVP)

---

### 7. Camera Demo Page (Public)

**Components:**
- `DemoHeader` - Logo, navigation, CTA buttons
- `LiveComparisonView` - Side-by-side original vs masked
- `LiveCameraFeed` - Real-time camera input (or simulated)
- `MaskedOutputFeed` - Real-time masked output
- `TargetChildSelector` - Select which child to keep visible
- `DemoStats` - Recording status, highlight count
- `HowItWorks` - Step-by-step explanation
- `RecentHighlights` - Sample highlights gallery
- `DemoControls` - Start/Stop recording, toggle view

**Features:**
- **Live demonstration** - Real-time face masking (or simulated with pre-recorded video)
- **Side-by-side comparison** - Show original vs masked simultaneously
- **Interactive controls** - Start/stop demo, select target child
- **Visual indicators** - Face detection boxes, masking overlay
- **Highlight preview** - Show generated highlights in real-time
- **Educational content** - Explain how the technology works
- **No login required** - Public demo for hackathon presentation

**Demo Modes (Priority Order):**

1. **Simulated Mode** (Default, Most Reliable):
   - Pre-recorded video loop with multiple people
   - Pre-processed masking (done beforehand)
   - Shows side-by-side comparison
   - Simulated "live" processing delay (100-200ms)
   - **Use this for hackathon demo** - most reliable

2. **Live Mode** (If camera available and user grants permission):
   - Real webcam feed via MediaStream API
   - Real-time processing via WebSocket to backend
   - Actual face detection and masking
   - Fallback to Simulated if camera denied/unavailable

3. **Interactive Mode** (Optional, Nice to Have):
   - User uploads test image/video
   - Process on-demand via API
   - Show before/after results
   - Can skip for MVP if time-constrained

**Target Child Selection:**
- For Simulated Mode: Pre-selected (hardcoded demo child)
- For Live Mode: Auto-detect faces, show selector dropdown
- If no children registered: Show placeholder "Select target child" with sample faces

**Key Interactions:**
- Click "Start Demo" → Begin simulated/live feed
- Select target child (if live mode) → Update masking in real-time
- Toggle "Show Detection" → Display/hide face bounding boxes
- Click highlight thumbnail → Open Video Player Modal with processed video
- "Try It Yourself" → Upload own image/video (if Interactive Mode implemented)

**Technical Implementation:**
- **Primary**: HTML5 video element with pre-recorded demo video
- **Fallback**: MediaStream API for live camera (request permission)
- Canvas for real-time masking overlay (if live mode)
- WebSocket or polling for highlight updates (optional, can use static list for MVP)
- Fallback gracefully: Simulated → Live → Error message

**Landing Page:**
- Demo page IS the landing page (`/` route)
- First thing users/judges see
- "Login" button in header for existing users
- "Try Demo" CTA prominently displayed

---

## Data Flow Clarifications

**Parent Dashboard:**
- Fetches highlights for ONE child (parent's registered child)
- Child association: Set during parent account creation
- API: `GET /api/highlights?user_id={parent_id}` (backend filters by child)

**Teacher Dashboard:**
- Fetches highlights for ALL classrooms/cameras in school
- School association: Set during teacher account creation
- API: `GET /api/teacher/dashboard` (returns aggregated data)

**Camera Management:**
- Teachers can see all cameras in their school
- Camera ownership: School-level (not teacher-specific)
- Multiple teachers can manage same cameras

**Child Registration:**
- **Who registers**: Teachers register children per camera
- **When**: During camera setup or later via camera settings
- **How**: Upload 3-5 photos, AI generates face embeddings
- **Storage**: Embeddings stored per camera (not globally)

---

## MVP Scope Clarifications

**Must Have:**
- Parent dashboard with highlights gallery
- Teacher dashboard with camera overview
- Camera management (view, add, edit, pause/resume)
- Video player modal (shared component)
- Demo page (simulated mode minimum)
- Basic authentication (email/password, JWT)

**Can Skip for MVP:**
- Camera deletion (just use pause)
- Bulk operations (pause all/resume all)
- Advanced filtering (date ranges, search)
- Child registration UI (can be hardcoded for demo)
- Settings page (just camera settings modal)
- Real-time live preview (use static thumbnails)
- WebSocket for live updates (use polling or static data)
- Interactive demo mode (upload test media)