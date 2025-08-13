"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Settings, Calendar, Heart, Star, Shield, LogOut, Plus } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function UserMenu() {
  const { user, logout } = useAuth()

  if (!user) return null

  const handleLogout = () => {
    logout()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              {user.isVerified && (
                <Badge variant="secondary" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            <Badge variant="outline" className="text-xs w-fit">
              {user.role === "user" ? "Adventurer" : user.role === "host" ? "Host" : "Admin"}
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/bookings" className="cursor-pointer">
            <Calendar className="mr-2 h-4 w-4" />
            <span>My Bookings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/favorites" className="cursor-pointer">
            <Heart className="mr-2 h-4 w-4" />
            <span>Favorites</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/reviews" className="cursor-pointer">
            <Star className="mr-2 h-4 w-4" />
            <span>Reviews</span>
          </Link>
        </DropdownMenuItem>

        {user.role === "host" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/host/dashboard" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Host Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/host/experiences/new" className="cursor-pointer">
                <Plus className="mr-2 h-4 w-4" />
                <span>Add Experience</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}

        {user.role === "admin" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin" className="cursor-pointer">
                <Shield className="mr-2 h-4 w-4" />
                <span>Admin Panel</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
