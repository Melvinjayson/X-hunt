"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "./types"
import { mockUsers } from "./mock-data"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (
    email: string,
    password: string,
    name: string,
    role?: "user" | "host",
  ) => Promise<{ success: boolean; error?: string }>
  loginWithSocial: (provider: "google" | "facebook" | "apple") => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("x-hunt-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem("x-hunt-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - find user by email
    const foundUser = mockUsers.find((u) => u.email === email)

    if (foundUser && password === "password123") {
      // Mock password check
      setUser(foundUser)
      localStorage.setItem("x-hunt-user", JSON.stringify(foundUser))
      setIsLoading(false)
      return { success: true }
    }

    setIsLoading(false)
    return { success: false, error: "Invalid email or password" }
  }

  const signup = async (email: string, password: string, name: string, role: "user" | "host" = "user") => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      setIsLoading(false)
      return { success: false, error: "User with this email already exists" }
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
      joinedAt: new Date(),
      isVerified: false,
      preferences: {
        categories: [],
        priceRange: [0, 500],
        difficulty: [],
      },
      stats: {
        totalBookings: 0,
        totalSpent: 0,
        reviewsGiven: 0,
      },
    }

    setUser(newUser)
    localStorage.setItem("x-hunt-user", JSON.stringify(newUser))
    setIsLoading(false)
    return { success: true }
  }

  const loginWithSocial = async (provider: "google" | "facebook" | "apple") => {
    setIsLoading(true)

    // Simulate social auth delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock social login - create a demo user
    const socialUser: User = {
      id: `${provider}-${Date.now()}`,
      email: `demo@${provider}.com`,
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      avatar: `/profile-photo-${Math.random() > 0.5 ? "man" : "woman"}.png`,
      role: "user",
      joinedAt: new Date(),
      isVerified: true,
      preferences: {
        categories: ["hiking", "photography"],
        priceRange: [50, 300],
        difficulty: ["beginner", "intermediate"],
      },
      stats: {
        totalBookings: 0,
        totalSpent: 0,
        reviewsGiven: 0,
      },
    }

    setUser(socialUser)
    localStorage.setItem("x-hunt-user", JSON.stringify(socialUser))
    setIsLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("x-hunt-user")
  }

  const value = {
    user,
    isLoading,
    login,
    signup,
    loginWithSocial,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
