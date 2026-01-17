"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockCameras, mockClassrooms, type Camera } from "@/lib/mock-data"
import { CameraIcon, Plus, Settings, Pause, Play, Circle, Video, AlertCircle, Sparkles } from "lucide-react"
import { format } from "date-fns"

export default function CameraManagementPage() {
  const [cameras, setCameras] = useState<Camera[]>(mockCameras)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null)

  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: "",
    classroom: "",
    resolution: "1080p",
  })

  const handleAddCamera = () => {
    setFormData({ name: "", classroom: "", resolution: "1080p" })
    setSelectedCamera(null)
    setIsAddModalOpen(true)
  }

  const handleEditCamera = (camera: Camera) => {
    setFormData({
      name: camera.name,
      classroom: camera.classroom,
      resolution: camera.resolution,
    })
    setSelectedCamera(camera)
    setIsAddModalOpen(true)
  }

  const handleSaveCamera = () => {
    if (selectedCamera) {
      setCameras(cameras.map((c) => (c.id === selectedCamera.id ? { ...c, ...formData } : c)))
    } else {
      const newCamera: Camera = {
        id: `cam-${cameras.length + 1}`,
        name: formData.name,
        classroom: formData.classroom,
        status: "active",
        lastActive: new Date(),
        resolution: formData.resolution,
      }
      setCameras([...cameras, newCamera])
    }
    setIsAddModalOpen(false)
  }

  const handleToggleCamera = (cameraId: string) => {
    setCameras(
      cameras.map((c) => {
        if (c.id === cameraId) {
          return {
            ...c,
            status: c.status === "active" ? "paused" : "active",
            lastActive: new Date(),
          }
        }
        return c
      }),
    )
  }

  const getStatusBadge = (status: Camera["status"]) => {
    switch (status) {
      case "active":
        return "bg-primary/10 text-primary border-0"
      case "paused":
        return "bg-amber-100 text-amber-700 border-0"
      case "offline":
        return "bg-red-100 text-red-700 border-0"
      default:
        return "bg-gray-100 text-gray-600 border-0"
    }
  }

  // Group cameras by classroom
  const camerasByClassroom = cameras.reduce(
    (acc, camera) => {
      if (!acc[camera.classroom]) {
        acc[camera.classroom] = []
      }
      acc[camera.classroom].push(camera)
      return acc
    },
    {} as Record<string, Camera[]>,
  )

  const totalActive = cameras.filter((c) => c.status === "active").length

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header Section - Updated styling */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Camera Management</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Camera Management</h1>
                <p className="text-muted-foreground">Configure and monitor classroom cameras</p>
              </div>

              <Button
                onClick={handleAddCamera}
                className="bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 shadow-md"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Camera
              </Button>
            </div>

            {/* Overview Stats - Updated styling */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Cameras</p>
                      <p className="text-3xl font-bold text-foreground">{cameras.length}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                      <CameraIcon className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Active</p>
                      <p className="text-3xl font-bold text-primary">{totalActive}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-emerald-100 flex items-center justify-center">
                      <Video className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Classrooms</p>
                      <p className="text-3xl font-bold text-teal-600">{Object.keys(camerasByClassroom).length}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/10 to-teal-100 flex items-center justify-center">
                      <Settings className="w-6 h-6 text-teal-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cameras by Classroom - Updated styling */}
            {Object.entries(camerasByClassroom).map(([classroom, classroomCameras]) => (
              <Card key={classroom} className="border-0 shadow-md bg-white">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-foreground">{classroom}</h2>
                    <Badge className="bg-primary/10 text-primary border-0">
                      {classroomCameras.filter((c) => c.status === "active").length}/{classroomCameras.length} active
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {classroomCameras.map((camera) => (
                      <Card
                        key={camera.id}
                        className="border border-primary/10 bg-gradient-to-br from-white to-emerald-50/30 hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4 space-y-3">
                          {/* Camera Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-10 h-10 rounded-xl ${
                                  camera.status === "active"
                                    ? "bg-gradient-to-br from-primary/10 to-emerald-100"
                                    : "bg-gray-100"
                                } flex items-center justify-center`}
                              >
                                <CameraIcon
                                  className={`w-5 h-5 ${camera.status === "active" ? "text-primary" : "text-muted-foreground"}`}
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold text-sm text-foreground">{camera.name}</h3>
                                <p className="text-xs text-muted-foreground">{camera.resolution}</p>
                              </div>
                            </div>
                            <Badge className={`text-xs ${getStatusBadge(camera.status)}`}>
                              <Circle className={`w-2 h-2 mr-1 ${camera.status === "active" ? "fill-current" : ""}`} />
                              {camera.status}
                            </Badge>
                          </div>

                          {/* Camera Info */}
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center justify-between">
                              <span>Last Active:</span>
                              <span className="font-medium text-foreground">{format(camera.lastActive, "h:mm a")}</span>
                            </div>
                            {camera.status === "offline" && (
                              <div className="flex items-center gap-1 text-destructive">
                                <AlertCircle className="w-3 h-3" />
                                <span>Connection lost</span>
                              </div>
                            )}
                          </div>

                          {/* Actions - Updated styling */}
                          <div className="flex gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 hover:bg-primary/5 hover:text-primary bg-transparent"
                              onClick={() => handleToggleCamera(camera.id)}
                              disabled={camera.status === "offline"}
                            >
                              {camera.status === "active" ? (
                                <>
                                  <Pause className="w-3 h-3 mr-1" />
                                  Pause
                                </>
                              ) : (
                                <>
                                  <Play className="w-3 h-3 mr-1" />
                                  Resume
                                </>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditCamera(camera)}
                              className="hover:bg-primary/5 hover:text-primary"
                            >
                              <Settings className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        {/* Add/Edit Camera Modal - Updated styling */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-foreground">{selectedCamera ? "Edit Camera" : "Add New Camera"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="camera-name" className="text-foreground font-medium">
                  Camera Name
                </Label>
                <Input
                  id="camera-name"
                  placeholder="e.g., Main Play Area"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 bg-muted/50 border-muted focus:border-primary focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="classroom" className="text-foreground font-medium">
                  Classroom
                </Label>
                <Select
                  value={formData.classroom}
                  onValueChange={(value) => setFormData({ ...formData, classroom: value })}
                >
                  <SelectTrigger className="h-12 bg-muted/50 border-muted focus:border-primary focus:ring-primary">
                    <SelectValue placeholder="Select a classroom" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClassrooms.map((classroom) => (
                      <SelectItem key={classroom.id} value={classroom.name}>
                        {classroom.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resolution" className="text-foreground font-medium">
                  Resolution
                </Label>
                <Select
                  value={formData.resolution}
                  onValueChange={(value) => setFormData({ ...formData, resolution: value })}
                >
                  <SelectTrigger className="h-12 bg-muted/50 border-muted focus:border-primary focus:ring-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="720p">720p HD</SelectItem>
                    <SelectItem value="1080p">1080p Full HD</SelectItem>
                    <SelectItem value="4K">4K Ultra HD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="hover:bg-primary/5">
                Cancel
              </Button>
              <Button
                onClick={handleSaveCamera}
                disabled={!formData.name || !formData.classroom}
                className="bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90"
              >
                {selectedCamera ? "Save Changes" : "Add Camera"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  )
}
