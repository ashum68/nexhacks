"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sparkles, LogOut, User, Video } from "lucide-react"

export function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo - Updated with friendly green theme */}
        <Link href={user?.role === "teacher" ? "/teacher" : "/dashboard"} className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-400 shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-foreground">Glimpse</span>
        </Link>

        {/* Navigation */}
        {user && (
          <div className="flex items-center gap-4">
            {user.role === "teacher" && (
              <nav className="hidden md:flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-foreground hover:text-primary hover:bg-primary/5"
                >
                  <Link href="/teacher">Dashboard</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-foreground hover:text-primary hover:bg-primary/5"
                >
                  <Link href="/teacher/cameras">Cameras</Link>
                </Button>
              </nav>
            )}

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                  <User className="w-5 h-5 text-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <p className="text-xs mt-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full inline-block w-fit font-medium capitalize">
                      {user.role}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === "teacher" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/teacher" className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/teacher/cameras" className="cursor-pointer">
                        <Video className="w-4 h-4 mr-2" />
                        Cameras
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  )
}
