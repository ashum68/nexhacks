"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Video,
  Clock,
  Heart,
  Sparkles,
  Camera,
  ChevronRight,
  Play,
  Sun,
  Palette,
  BookOpen,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

// Simulated highlight moments for "A Day at School" reel
const highlightMoments = [
  {
    id: 1,
    time: "8:30 AM",
    activity: "Morning Circle",
    description: "Emma joined friends for songs and stories",
    icon: Sun,
    image: "/preschool-child-reading-book.jpg",
  },
  {
    id: 2,
    time: "10:00 AM",
    activity: "Art Time",
    description: "Creating a colorful finger painting masterpiece",
    icon: Palette,
    image: "/preschool-child-painting.jpg",
  },
  {
    id: 3,
    time: "11:30 AM",
    activity: "Learning Center",
    description: "Building towers and practicing counting",
    icon: BookOpen,
    image: "/preschool-child-building-blocks.jpg",
  },
  {
    id: 4,
    time: "2:00 PM",
    activity: "Outdoor Play",
    description: "Running and playing with friends outside",
    icon: Users,
    image: "/preschool-child-playing-outside.jpg",
  },
]

export default function LandingPage() {
  const [activeHighlight, setActiveHighlight] = useState(0)

  // Auto-rotate highlights
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % highlightMoments.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">Glimpse</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="text-foreground hover:text-primary">
              <Link href="/camera">Try Demo</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-emerald-500 shadow-md">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-12 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <Badge className="bg-emerald-100 text-primary border-0 px-4 py-1.5 text-sm font-medium">
                <Heart className="w-4 h-4 mr-2 fill-current" />
                Built for families who care
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                See their day.
                <br />
                <span className="text-primary">Protect their privacy.</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Get daily video highlights of your child at school while AI automatically protects every child&apos;s
                face. Stay connected to the moments that matter most.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  size="lg"
                  asChild
                  className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 shadow-lg friendly-glow"
                >
                  <Link href="/login">
                    Get Started Free
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="h-14 px-8 text-base font-semibold border-2 border-primary/20 hover:bg-primary/5 bg-transparent"
                >
                  <Link href="/camera">
                    <Camera className="w-5 h-5 mr-2" />
                    Try Live Demo
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>100% Privacy Protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>No Setup Required</span>
                </div>
              </div>
            </div>

            {/* Right: Highlight Reel Preview */}
            <div className="relative">
              <Card className="overflow-hidden border-0 shadow-2xl bg-white">
                <CardContent className="p-0">
                  {/* Phone Frame Mockup */}
                  <div className="bg-gradient-to-b from-emerald-50 to-white p-6">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                      {/* Phone Header */}
                      <div className="bg-gradient-to-r from-primary to-emerald-500 px-4 py-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-white" />
                        <span className="text-white font-semibold text-sm">{"Emma's"} Day - Today</span>
                      </div>

                      {/* Highlight Content */}
                      <div className="relative aspect-[4/3] bg-gray-100">
                        <Image
                          src={highlightMoments[activeHighlight].image || "/placeholder.svg"}
                          alt={highlightMoments[activeHighlight].activity}
                          fill
                          className="object-cover transition-opacity duration-500"
                          style={{ filter: "blur(8px)" }}
                        />
                        {/* Privacy Badge Overlay */}
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white/90 text-primary border-0 shadow-md">
                            <Shield className="w-3 h-3 mr-1" />
                            Privacy On
                          </Badge>
                        </div>
                        {/* Time Badge */}
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-black/60 text-white border-0">
                            {highlightMoments[activeHighlight].time}
                          </Badge>
                        </div>
                      </div>

                      {/* Highlight Info */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          {(() => {
                            const IconComponent = highlightMoments[activeHighlight].icon
                            return (
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <IconComponent className="w-4 h-4 text-primary" />
                              </div>
                            )
                          })()}
                          <span className="font-semibold text-foreground">
                            {highlightMoments[activeHighlight].activity}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{highlightMoments[activeHighlight].description}</p>
                      </div>

                      {/* Timeline Dots */}
                      <div className="px-4 pb-4 flex justify-center gap-2">
                        {highlightMoments.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveHighlight(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === activeHighlight ? "bg-primary w-6" : "bg-gray-300 hover:bg-gray-400"
                            }`}
                            aria-label={`View highlight ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-8 -right-8 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl" />
              <div className="absolute -z-10 -bottom-8 -left-8 w-48 h-48 bg-teal-200/30 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* "A Day at School" Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-white text-primary border border-primary/20 px-4 py-1.5 mb-4">
                <Video className="w-4 h-4 mr-2" />A Day at School
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Never miss a moment</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Receive a beautiful highlight reel of your child&apos;s day, automatically curated and
                privacy-protected.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {highlightMoments.map((moment, index) => {
                const IconComponent = moment.icon
                return (
                  <Card
                    key={moment.id}
                    className={`border-0 shadow-md hover:shadow-lg transition-all cursor-pointer ${
                      index === activeHighlight ? "ring-2 ring-primary shadow-lg" : ""
                    }`}
                    onClick={() => setActiveHighlight(index)}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 p-4">
                        {/* Time */}
                        <div className="w-20 text-center flex-shrink-0">
                          <span className="text-sm font-bold text-primary">{moment.time}</span>
                        </div>

                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-emerald-100 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground">{moment.activity}</h3>
                          <p className="text-sm text-muted-foreground truncate">{moment.description}</p>
                        </div>

                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                          <Image
                            src={moment.image || "/placeholder.svg"}
                            alt={moment.activity}
                            fill
                            className="object-cover"
                            style={{ filter: "blur(4px)" }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <Play className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Simple, safe, and automatic</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Glimpse works seamlessly in the background so you can focus on what matters.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <Card className="border-0 shadow-lg bg-white text-center">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center shadow-lg">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <div className="inline-block bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full">
                    Step 1
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Camera Records</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Classroom cameras capture the day&apos;s activities automatically without any teacher involvement.
                  </p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="border-0 shadow-lg bg-white text-center">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="inline-block bg-teal-500/10 text-teal-600 text-sm font-bold px-3 py-1 rounded-full">
                    Step 2
                  </div>
                  <h3 className="text-xl font-bold text-foreground">AI Protects Privacy</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our AI instantly detects and blurs all faces before any video is saved or shared.
                  </p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="border-0 shadow-lg bg-white text-center">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center shadow-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="inline-block bg-emerald-500/10 text-emerald-600 text-sm font-bold px-3 py-1 rounded-full">
                    Step 3
                  </div>
                  <h3 className="text-xl font-bold text-foreground">You Get Highlights</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Receive curated clips of your child&apos;s special moments sent directly to your phone.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props for Parents & Teachers */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* For Parents */}
              <Card className="border-0 shadow-xl bg-white overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-primary to-emerald-500 p-6 text-white">
                    <div className="flex items-center gap-3">
                      <Heart className="w-8 h-8" />
                      <h3 className="text-2xl font-bold">For Parents</h3>
                    </div>
                    <p className="mt-2 text-white/90">Stay connected to your child&apos;s world</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Video className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Daily Highlight Reels</h4>
                        <p className="text-sm text-muted-foreground">
                          See your child&apos;s art, play, and learning moments every day
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Complete Privacy</h4>
                        <p className="text-sm text-muted-foreground">
                          All children&apos;s faces are automatically protected
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Real-Time Updates</h4>
                        <p className="text-sm text-muted-foreground">
                          Get notified when new highlights are ready to watch
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* For Schools */}
              <Card className="border-0 shadow-xl bg-white overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-6 text-white">
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8" />
                      <h3 className="text-2xl font-bold">For Schools</h3>
                    </div>
                    <p className="mt-2 text-white/90">Connect families without extra work</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Zero Extra Effort</h4>
                        <p className="text-sm text-muted-foreground">
                          Fully automated - no photos to take or videos to edit
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Privacy Compliant</h4>
                        <p className="text-sm text-muted-foreground">Meet regulations while keeping parents happy</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                        <Camera className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Easy Dashboard</h4>
                        <p className="text-sm text-muted-foreground">
                          Manage cameras and settings from one simple place
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-primary via-emerald-500 to-teal-500 text-white overflow-hidden">
            <CardContent className="p-12 text-center relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl" />
              </div>

              <div className="relative space-y-6">
                <Sparkles className="w-12 h-12 mx-auto" />
                <h2 className="text-3xl md:text-4xl font-bold">Ready to see the difference?</h2>
                <p className="text-lg text-white/90 max-w-2xl mx-auto">
                  Try our live demo with your camera or sign in to explore what Glimpse can do for your family.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button
                    size="lg"
                    asChild
                    className="h-14 px-8 text-base font-semibold bg-white text-primary hover:bg-white/90 shadow-lg"
                  >
                    <Link href="/login">
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="h-14 px-8 text-base font-semibold border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white"
                  >
                    <Link href="/camera">
                      <Play className="w-5 h-5 mr-2" />
                      Try Live Demo
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-foreground">Glimpse</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Privacy-first monitoring for families who care. Built with love.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
