"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignup: () => void
}

export function LoginModal({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { login, loginWithSocial, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const result = await login(email, password)
    if (result.success) {
      onClose()
      setEmail("")
      setPassword("")
    } else {
      setError(result.error || "Login failed")
    }
  }

  const handleSocialLogin = async (provider: "google" | "facebook" | "apple") => {
    setError("")
    const result = await loginWithSocial(provider)
    if (result.success) {
      onClose()
    } else {
      setError(result.error || "Social login failed")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-heading font-bold">Welcome back</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => handleSocialLogin("facebook")}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Continue with Facebook
            </Button>

            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => handleSocialLogin("apple")}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C8.396 0 8.025.044 6.79.207 5.56.37 4.703.64 3.965.984c-.789.37-1.459.86-2.126 1.526C1.172 3.177.683 3.847.312 4.636c-.344.738-.614 1.595-.777 2.825C-.608 8.695-.652 9.066-.652 12.686s.044 3.991.207 5.226c.163 1.23.433 2.087.777 2.825.37.789.86 1.459 1.526 2.126.667.666 1.337 1.156 2.126 1.526.738.344 1.595.614 2.825.777 1.235.163 1.606.207 5.226.207s3.991-.044 5.226-.207c1.23-.163 2.087-.433 2.825-.777.789-.37 1.459-.86 2.126-1.526.666-.667 1.156-1.337 1.526-2.126.344-.738.614-1.595.777-2.825.163-1.235.207-1.606.207-5.226s-.044-3.991-.207-5.226c-.163-1.23-.433-2.087-.777-2.825-.37-.789-.86-1.459-1.526-2.126C19.677 1.172 19.007.683 18.218.312c-.738-.344-1.595-.614-2.825-.777C14.158-.608 13.787-.652 10.167-.652zm0 2.165c3.557 0 3.98.044 5.38.207 1.298.059 2.003.277 2.473.46.621.242 1.065.532 1.531.998.466.466.756.91.998 1.531.183.47.401 1.175.46 2.473.163 1.4.207 1.823.207 5.38s-.044 3.98-.207 5.38c-.059 1.298-.277 2.003-.46 2.473-.242.621-.532 1.065-.998 1.531-.466.466-.91.756-1.531.998-.47.183-1.175.401-2.473.46-1.4.163-1.823.207-5.38.207s-3.98-.044-5.38-.207c-1.298-.059-2.003-.277-2.473-.46-.621-.242-1.065-.532-1.531-.998-.466-.466-.756-.91-.998-1.531-.183-.47-.401-1.175-.46-2.473-.163-1.4-.207-1.823-.207-5.38s.044-3.98.207-5.38c.059-1.298.277-2.003.46-2.473.242-.621.532-1.065.998-1.531.466-.466.91-.756 1.531-.998.47-.183 1.175-.401 2.473-.46 1.4-.163 1.823-.207 5.38-.207z" />
              </svg>
              Continue with Apple
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <button onClick={onSwitchToSignup} className="text-primary hover:underline font-medium">
              Sign up
            </button>
          </div>

          <div className="text-center">
            <button className="text-sm text-primary hover:underline">Forgot your password?</button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            <p>Demo credentials: Use any email from mock data with password "password123"</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
