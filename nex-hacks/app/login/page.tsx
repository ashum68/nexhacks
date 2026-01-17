"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Heart, Shield } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const success = await login(email, password)

    if (success) {
      router.push("/dashboard")
    } else {
      setError("Invalid email or password. Try demo credentials.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-emerald-50/30 to-white pattern-dots p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Brand - Friendly and warm */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-emerald-400 shadow-lg friendly-glow mb-2">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Glimpse</h1>
          <p className="text-muted-foreground text-base">See their day. Protect their privacy.</p>
        </div>

        {/* Login Card - Clean white with soft shadow */}
        <Card className="border-0 shadow-xl bg-white">
          <CardHeader className="space-y-1 text-center pb-2">
            <CardTitle className="text-2xl font-bold">Welcome back!</CardTitle>
            <CardDescription className="text-base">Sign in to see today&apos;s moments</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-muted/50 border-muted focus:border-primary focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 bg-muted/50 border-muted focus:border-primary focus:ring-primary"
                />
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 shadow-md"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            {/* Demo Credentials - Friendly styling */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-primary/20 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Heart className="w-4 h-4" />
                Try it out with demo accounts
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-white/60 rounded-lg">
                  <span className="text-muted-foreground font-medium">Parent:</span>
                  <code className="text-foreground font-semibold">parent@example.com</code>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/60 rounded-lg">
                  <span className="text-muted-foreground font-medium">Teacher:</span>
                  <code className="text-foreground font-semibold">teacher@example.com</code>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/60 rounded-lg">
                  <span className="text-muted-foreground font-medium">Password:</span>
                  <code className="text-foreground font-semibold">demo</code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer - Trust indicators */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4 text-primary" />
          <span>Protected by AI-powered privacy technology</span>
        </div>
      </div>
    </div>
  )
}
