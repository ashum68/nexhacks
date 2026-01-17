export interface User {
  id: string
  email: string
  name: string
  role: "parent" | "teacher"
  children?: Child[]
}

export interface Child {
  id: string
  name: string
  classroom: string
  parentId: string
}

export interface Highlight {
  id: string
  childId: string
  childName: string
  classroom: string
  timestamp: Date
  thumbnailUrl: string
  videoUrl: string
  description: string
  duration: number // in seconds
}

export interface Camera {
  id: string
  name: string
  classroom: string
  status: "active" | "paused" | "offline"
  lastActive: Date
  resolution: string
}

export interface Classroom {
  id: string
  name: string
  teacherId: string
  cameraCount: number
  activeHighlights: number
  status: "active" | "inactive"
}

// Mock users
export const mockUsers: User[] = [
  {
    id: "parent-1",
    email: "parent@example.com",
    name: "Sarah Johnson",
    role: "parent",
    children: [{ id: "child-1", name: "Emma Johnson", classroom: "Sunflower Room", parentId: "parent-1" }],
  },
  {
    id: "teacher-1",
    email: "teacher@example.com",
    name: "Ms. Rodriguez",
    role: "teacher",
  },
]

// Mock highlights
export const mockHighlights: Highlight[] = [
  {
    id: "h-1",
    childId: "child-1",
    childName: "Emma",
    classroom: "Sunflower Room",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    thumbnailUrl: "/preschool-child-painting.jpg",
    videoUrl: "#",
    description: "Painting at the art station",
    duration: 45,
  },
  {
    id: "h-2",
    childId: "child-1",
    childName: "Emma",
    classroom: "Sunflower Room",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    thumbnailUrl: "/preschool-child-building-blocks.jpg",
    videoUrl: "#",
    description: "Building with blocks",
    duration: 62,
  },
  {
    id: "h-3",
    childId: "child-1",
    childName: "Emma",
    classroom: "Sunflower Room",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // Yesterday
    thumbnailUrl: "/preschool-child-reading-book.jpg",
    videoUrl: "#",
    description: "Reading during story time",
    duration: 38,
  },
  {
    id: "h-4",
    childId: "child-1",
    childName: "Emma",
    classroom: "Sunflower Room",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    thumbnailUrl: "/preschool-child-playing-outside.jpg",
    videoUrl: "#",
    description: "Playing on the playground",
    duration: 55,
  },
]

// Mock classrooms
export const mockClassrooms: Classroom[] = [
  {
    id: "class-1",
    name: "Sunflower Room",
    teacherId: "teacher-1",
    cameraCount: 3,
    activeHighlights: 8,
    status: "active",
  },
  {
    id: "class-2",
    name: "Rainbow Room",
    teacherId: "teacher-1",
    cameraCount: 2,
    activeHighlights: 5,
    status: "active",
  },
  {
    id: "class-3",
    name: "Butterfly Room",
    teacherId: "teacher-1",
    cameraCount: 2,
    activeHighlights: 3,
    status: "inactive",
  },
]

// Mock cameras
export const mockCameras: Camera[] = [
  {
    id: "cam-1",
    name: "Main Play Area",
    classroom: "Sunflower Room",
    status: "active",
    lastActive: new Date(),
    resolution: "1080p",
  },
  {
    id: "cam-2",
    name: "Art Station",
    classroom: "Sunflower Room",
    status: "active",
    lastActive: new Date(),
    resolution: "1080p",
  },
  {
    id: "cam-3",
    name: "Reading Corner",
    classroom: "Sunflower Room",
    status: "paused",
    lastActive: new Date(Date.now() - 1000 * 60 * 15),
    resolution: "720p",
  },
  {
    id: "cam-4",
    name: "Play Area",
    classroom: "Rainbow Room",
    status: "active",
    lastActive: new Date(),
    resolution: "1080p",
  },
  {
    id: "cam-5",
    name: "Snack Table",
    classroom: "Rainbow Room",
    status: "offline",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2),
    resolution: "1080p",
  },
]
