"use client"

import { useState } from "react"
import Image from "next/image"
import { ProtectedRoute } from "@/components/protected-route"
import { Header } from "@/components/header"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { mockHighlights, type Highlight } from "@/lib/mock-data"
import { Calendar, Clock, Play, Heart, Video, Filter, MapPin, Sparkles, Sun } from "lucide-react"
import { format, isToday, isThisWeek, isThisMonth } from "date-fns"

type FilterType = "all" | "today" | "week" | "month"

export default function ParentDashboard() {
  const { user } = useAuth()
  const [filter, setFilter] = useState<FilterType>("all")
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(null)

  // Filter highlights based on selected time range
  const filteredHighlights = mockHighlights.filter((h) => {
    if (filter === "today") return isToday(h.timestamp)
    if (filter === "week") return isThisWeek(h.timestamp)
    if (filter === "month") return isThisMonth(h.timestamp)
    return true
  })

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getRelativeTime = (date: Date) => {
    if (isToday(date)) return "Today"
    if (isThisWeek(date)) return format(date, "EEEE")
    return format(date, "MMM d")
  }

  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section - Updated styling */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-6 h-6 text-amber-500" />
                  <span className="text-sm font-medium text-muted-foreground">Good morning!</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Welcome back, {user?.name?.split(" ")[0]}
                </h1>
                <p className="text-muted-foreground">
                  Here are {user?.children?.[0]?.name}&apos;s latest highlights from{" "}
                  <span className="text-primary font-semibold">{user?.children?.[0]?.classroom}</span>
                </p>
              </div>

              {/* Child Info Card - Updated to green theme */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-emerald-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white font-bold text-xl shadow-md">
                      {user?.children?.[0]?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{user?.children?.[0]?.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3 text-primary" />
                        {user?.children?.[0]?.classroom}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Overview - Updated to green theme */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Today&apos;s Highlights</p>
                      <p className="text-3xl font-bold text-primary">
                        {mockHighlights.filter((h) => isToday(h.timestamp)).length}
                      </p>
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
                      <p className="text-sm text-muted-foreground mb-1">This Week</p>
                      <p className="text-3xl font-bold text-teal-600">
                        {mockHighlights.filter((h) => isThisWeek(h.timestamp)).length}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/10 to-teal-100 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-teal-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Moments</p>
                      <p className="text-3xl font-bold text-rose-500">{mockHighlights.length}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/10 to-rose-100 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-rose-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters - Updated styling */}
            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground mr-2">Filter:</span>
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("all")}
                    className={filter === "all" ? "bg-primary hover:bg-primary/90" : "hover:bg-primary/5"}
                  >
                    All Time
                  </Button>
                  <Button
                    variant={filter === "today" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("today")}
                    className={filter === "today" ? "bg-primary hover:bg-primary/90" : "hover:bg-primary/5"}
                  >
                    Today
                  </Button>
                  <Button
                    variant={filter === "week" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("week")}
                    className={filter === "week" ? "bg-primary hover:bg-primary/90" : "hover:bg-primary/5"}
                  >
                    This Week
                  </Button>
                  <Button
                    variant={filter === "month" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("month")}
                    className={filter === "month" ? "bg-primary hover:bg-primary/90" : "hover:bg-primary/5"}
                  >
                    This Month
                  </Button>
                  <Badge className="ml-auto bg-primary/10 text-primary border-0">
                    {filteredHighlights.length} highlight{filteredHighlights.length !== 1 ? "s" : ""}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Gallery Grid - Updated styling */}
            {filteredHighlights.length === 0 ? (
              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <Video className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">No highlights yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Check back later for new moments from {user?.children?.[0]?.classroom}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHighlights.map((highlight) => (
                  <Card
                    key={highlight.id}
                    className="group cursor-pointer border-0 shadow-md bg-white hover:shadow-xl transition-all overflow-hidden"
                    onClick={() => setSelectedHighlight(highlight)}
                  >
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      <Image
                        src={highlight.thumbnailUrl || "/placeholder.svg"}
                        alt={highlight.description}
                        fill
                        className="object-cover blur-sm group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <Badge className="absolute bottom-3 right-3 bg-black/60 text-white border-0 text-xs">
                        {formatDuration(highlight.duration)}
                      </Badge>
                    </div>

                    <CardContent className="p-4 space-y-2">
                      <h3 className="font-semibold text-foreground line-clamp-1">{highlight.description}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-primary" />
                          {getRelativeTime(highlight.timestamp)}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary" />
                          {highlight.classroom}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{format(highlight.timestamp, "h:mm a")}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Video Modal - Updated styling */}
        <Dialog open={!!selectedHighlight} onOpenChange={() => setSelectedHighlight(null)}>
          <DialogContent className="max-w-4xl border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                {selectedHighlight?.description}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                {selectedHighlight && (
                  <Image
                    src={selectedHighlight.thumbnailUrl || "/placeholder.svg"}
                    alt={selectedHighlight.description}
                    fill
                    className="object-cover blur-sm"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur flex items-center justify-center mx-auto shadow-lg">
                      <Play className="w-10 h-10 text-primary ml-1" fill="currentColor" />
                    </div>
                    <p className="text-sm text-white bg-black/40 px-4 py-2 rounded-full">
                      Video playback would appear here
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    {selectedHighlight && format(selectedHighlight.timestamp, "MMMM d, yyyy 'at' h:mm a")}
                  </div>
                  <Badge className="bg-primary/10 text-primary border-0">
                    {selectedHighlight && formatDuration(selectedHighlight.duration)}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  {selectedHighlight?.classroom}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  )
}
