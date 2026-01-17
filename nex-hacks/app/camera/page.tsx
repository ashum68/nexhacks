"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Video,
  VideoOff,
  Shield,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Zap,
  Heart,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CameraSimulationPage() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [isBlurEnabled, setIsBlurEnabled] = useState(true)
  const [error, setError] = useState("")
  const [facesDetected, setFacesDetected] = useState(0)
  const [streamQuality, setStreamQuality] = useState("1080p")

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationRef = useRef<number | null>(null)

  // Start camera stream
  const startStream = async () => {
    try {
      setError("")
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: "user" },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsStreaming(true)

        // Start processing frames
        videoRef.current.onloadedmetadata = () => {
          processFrame()
        }
      }
    } catch (err) {
      setError("Unable to access camera. Please grant camera permissions and try again.")
      console.error("Camera access error:", err)
    }
  }

  // Stop camera stream
  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setIsStreaming(false)
    setFacesDetected(0)
  }

  // Process video frames
  const processFrame = () => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx || video.readyState !== video.HAVE_ENOUGH_DATA) {
      animationRef.current = requestAnimationFrame(processFrame)
      return
    }

    // Set canvas size to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw the video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Simulate face detection (in production, this would use TensorFlow.js or similar)
    const mockFaces = simulateFaceDetection(canvas.width, canvas.height)
    setFacesDetected(mockFaces.length)

    // Apply blur to detected faces if enabled
    if (isBlurEnabled && mockFaces.length > 0) {
      mockFaces.forEach((face) => {
        applyBlur(ctx, face.x, face.y, face.width, face.height)
      })
    }

    // Continue processing
    animationRef.current = requestAnimationFrame(processFrame)
  }

  // Simulate face detection (returns mock face regions)
  const simulateFaceDetection = (width: number, height: number) => {
    const numFaces = Math.floor(Math.random() * 3) + 1
    const faces = []

    for (let i = 0; i < numFaces; i++) {
      faces.push({
        x: Math.random() * (width * 0.6),
        y: Math.random() * (height * 0.6),
        width: width * 0.15 + Math.random() * (width * 0.1),
        height: height * 0.2 + Math.random() * (height * 0.1),
      })
    }

    return faces
  }

  // Apply blur effect to a region - Updated with green theme
  const applyBlur = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
    const imageData = ctx.getImageData(x, y, width, height)

    const blurRadius = 15
    const tempCanvas = document.createElement("canvas")
    tempCanvas.width = width
    tempCanvas.height = height
    const tempCtx = tempCanvas.getContext("2d")

    if (!tempCtx) return

    tempCtx.putImageData(imageData, 0, 0)

    ctx.save()
    ctx.filter = `blur(${blurRadius}px)`
    ctx.drawImage(tempCanvas, x, y, width, height, x, y, width, height)
    ctx.restore()

    ctx.strokeStyle = "rgba(34, 197, 94, 0.6)"
    ctx.lineWidth = 2
    ctx.strokeRect(x, y, width, height)

    ctx.fillStyle = "rgba(34, 197, 94, 0.8)"
    ctx.font = "16px sans-serif"
    ctx.fillText("🛡️", x + 5, y + 20)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopStream()
    }
  }, [])

  // Update processing when blur is toggled
  useEffect(() => {
    if (isStreaming) {
      processFrame()
    }
  }, [isBlurEnabled])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white">
      {/* Header - Updated with green theme */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="sm" asChild className="text-foreground hover:text-primary hover:bg-primary/5">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground">Glimpse</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Title Section - Updated styling */}
          <div className="text-center space-y-3">
            <Badge className="bg-emerald-100 text-primary border-0 px-4 py-1.5">
              <Camera className="w-4 h-4 mr-2" />
              Live Camera Simulation
            </Badge>
            <h1 className="text-4xl font-bold text-foreground">Real-Time Face Blurring Demo</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience how Glimpse automatically detects and blurs faces in real-time to protect children&apos;s
              privacy.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Camera View - Updated styling */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl bg-white overflow-hidden">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <Camera className="w-5 h-5 text-primary" />
                        Camera Feed
                      </CardTitle>
                      <CardDescription>
                        {isStreaming ? "Live camera with AI face detection" : "Click start to begin camera simulation"}
                      </CardDescription>
                    </div>
                    {isStreaming && (
                      <Badge className="bg-primary/10 text-primary border-0">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
                        LIVE
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Video Display */}
                  <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
                    {!isStreaming ? (
                      <div className="text-center space-y-4 p-8">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-emerald-100 flex items-center justify-center mx-auto">
                          <Camera className="w-10 h-10 text-primary" />
                        </div>
                        <p className="text-muted-foreground font-medium">Camera is not active</p>
                        <p className="text-sm text-muted-foreground">Click the button below to start the demo</p>
                      </div>
                    ) : (
                      <>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="absolute inset-0 w-full h-full object-cover hidden"
                        />

                        <canvas ref={canvasRef} className="w-full h-full object-cover" />

                        {/* Overlay Info */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <Badge className="bg-white/90 text-foreground border-0 shadow-md">{streamQuality}</Badge>
                          {isBlurEnabled && facesDetected > 0 && (
                            <Badge className="bg-primary/90 text-white border-0 shadow-md">
                              <Shield className="w-3 h-3 mr-1" />
                              {facesDetected} face{facesDetected !== 1 ? "s" : ""} blurred
                            </Badge>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Controls - Updated styling */}
                  <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-emerald-50/50 to-white">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        {!isStreaming ? (
                          <Button
                            onClick={startStream}
                            className="gap-2 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 shadow-md"
                          >
                            <Video className="w-4 h-4" />
                            Start Camera
                          </Button>
                        ) : (
                          <Button onClick={stopStream} variant="destructive" className="gap-2">
                            <VideoOff className="w-4 h-4" />
                            Stop Camera
                          </Button>
                        )}

                        {isStreaming && (
                          <Button
                            onClick={() => setIsBlurEnabled(!isBlurEnabled)}
                            variant={isBlurEnabled ? "default" : "outline"}
                            className={`gap-2 ${isBlurEnabled ? "bg-primary hover:bg-primary/90" : "hover:bg-primary/5"}`}
                          >
                            <Shield className="w-4 h-4" />
                            {isBlurEnabled ? "Blur: ON" : "Blur: OFF"}
                          </Button>
                        )}
                      </div>

                      {isStreaming && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          Processing at 30 FPS
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Info Panel - Updated styling */}
            <div className="space-y-6">
              {/* Stats Card */}
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Live Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-primary/5 to-emerald-50">
                    <span className="text-sm text-muted-foreground font-medium">Faces Detected</span>
                    <span className="text-2xl font-bold text-primary">{facesDetected}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50">
                    <span className="text-sm text-muted-foreground font-medium">Blur Status</span>
                    <Badge className={isBlurEnabled ? "bg-primary/10 text-primary border-0" : "bg-gray-100 border-0"}>
                      {isBlurEnabled ? "Active" : "Disabled"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <span className="text-sm text-muted-foreground font-medium">Stream Quality</span>
                    <span className="text-sm font-semibold text-foreground">{streamQuality}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <span className="text-sm text-muted-foreground font-medium">Processing</span>
                    <span className="text-sm font-semibold text-foreground">{isStreaming ? "Real-time" : "Idle"}</span>
                  </div>
                </CardContent>
              </Card>

              {/* How It Works - Updated styling */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-emerald-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                    <Zap className="w-5 h-5 text-primary" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">
                      1
                    </div>
                    <p className="text-muted-foreground">
                      AI detects all faces in the camera frame using advanced computer vision
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">
                      2
                    </div>
                    <p className="text-muted-foreground">
                      Blur effect is applied to each detected face region in real-time
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">
                      3
                    </div>
                    <p className="text-muted-foreground">
                      Processed video is transmitted, ensuring privacy before it leaves the camera
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Notice - Updated styling */}
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">Privacy Protected</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        This demo runs entirely in your browser. No video is uploaded or stored. Your camera feed
                        remains private.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom CTA - Updated styling */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-primary to-emerald-500 text-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Heart className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold text-lg">Ready to protect your classroom?</h3>
                    <p className="text-sm text-white/90">Sign in to explore parent and teacher dashboards</p>
                  </div>
                </div>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-md">
                  <Link href="/login">Get Started</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
