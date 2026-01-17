"use client"
import Link from "next/link"
import Image from "next/image"
import { ProtectedRoute } from "@/components/protected-route"
import { Header } from "@/components/header"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockClassrooms, mockHighlights, mockCameras } from "@/lib/mock-data"
import {
  Video,
  Users,
  Camera,
  Activity,
  Clock,
  TrendingUp,
  ChevronRight,
  Play,
  Circle,
  Settings,
  Sparkles,
} from "lucide-react"
import { format, isToday } from "date-fns"

export default function TeacherDashboard() {
  const { user } = useAuth()

  // Calculate stats
  const totalCameras = mockCameras.length
  const activeCameras = mockCameras.filter((c) => c.status === "active").length
  const todaysHighlights = mockHighlights.filter((h) => isToday(h.timestamp)).length
  const totalClassrooms = mockClassrooms.length

  // Get recent highlights across all classrooms
  const recentHighlights = mockHighlights.slice(0, 6)

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section - Updated styling */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Teacher Dashboard</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Welcome back, {user?.name}</h1>
                <p className="text-muted-foreground">Monitor your classrooms and manage cameras</p>
              </div>

              <Button
                asChild
                className="bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 shadow-md"
              >
                <Link href="/teacher/cameras">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Cameras
                </Link>
              </Button>
            </div>

            {/* Stats Grid - Updated to green theme */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Active Cameras</p>
                      <p className="text-3xl font-bold text-primary">
                        {activeCameras}/{totalCameras}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-emerald-100 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Today&apos;s Highlights</p>
                      <p className="text-3xl font-bold text-teal-600">{todaysHighlights}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/10 to-teal-100 flex items-center justify-center">
                      <Video className="w-6 h-6 text-teal-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Classrooms</p>
                      <p className="text-3xl font-bold text-amber-600">{totalClassrooms}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-100 flex items-center justify-center">
                      <Users className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">System Status</p>
                      <p className="text-lg font-bold text-primary flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Operational
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-emerald-100 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Classrooms Overview - Updated styling */}
            <Card className="border-0 shadow-md bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Users className="w-5 h-5 text-primary" />
                    Your Classrooms
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild className="text-primary hover:bg-primary/5">
                    <Link href="/teacher/cameras">
                      View All
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {mockClassrooms.map((classroom) => {
                    const classroomCameras = mockCameras.filter((c) => c.classroom === classroom.name)
                    const activeCount = classroomCameras.filter((c) => c.status === "active").length

                    return (
                      <Card
                        key={classroom.id}
                        className="border border-primary/10 bg-gradient-to-br from-white to-emerald-50/30"
                      >
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-foreground mb-1">{classroom.name}</h3>
                              <Badge
                                className={`text-xs ${
                                  classroom.status === "active"
                                    ? "bg-primary/10 text-primary border-0"
                                    : "bg-gray-100 text-gray-600 border-0"
                                }`}
                              >
                                {classroom.status === "active" ? (
                                  <Circle className="w-2 h-2 mr-1 fill-current" />
                                ) : (
                                  <Circle className="w-2 h-2 mr-1" />
                                )}
                                {classroom.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Cameras</span>
                              <span className="font-semibold text-foreground">
                                {activeCount}/{classroom.cameraCount}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Today&apos;s Highlights</span>
                              <span className="font-semibold text-foreground">{classroom.activeHighlights}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Highlights - Updated styling */}
            <Card className="border-0 shadow-md bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Video className="w-5 h-5 text-primary" />
                    Recent Highlights
                  </CardTitle>
                  <Badge className="bg-primary/10 text-primary border-0">{recentHighlights.length} recent</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentHighlights.map((highlight) => (
                    <Card
                      key={highlight.id}
                      className="border border-primary/10 bg-gradient-to-br from-white to-emerald-50/30 overflow-hidden group hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-video bg-gray-100">
                        <Image
                          src={highlight.thumbnailUrl || "/placeholder.svg"}
                          alt={highlight.description}
                          fill
                          className="object-cover blur-sm"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md">
                            <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
                          </div>
                        </div>
                        <Badge className="absolute top-2 left-2 text-xs bg-white/90 text-foreground border-0 shadow-sm">
                          {highlight.classroom}
                        </Badge>
                      </div>
                      <CardContent className="p-3 space-y-1">
                        <p className="text-sm font-semibold text-foreground line-clamp-1">{highlight.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 text-primary" />
                          {format(highlight.timestamp, "h:mm a")}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
