"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Search } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { UserMenu } from "@/components/auth/user-menu"
import { LoginModal } from "@/components/auth/login-modal"
import { SignupModal } from "@/components/auth/signup-modal"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const { isAuthenticated, user } = useAuth()

  const switchToSignup = () => {
    setShowLoginModal(false)
    setShowSignupModal(true)
  }

  const switchToLogin = () => {
    setShowSignupModal(false)
    setShowLoginModal(true)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image src="/x-hunt-logo.svg" alt="X-hunt" width={240} height={64} className="h-16 w-auto" priority />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
                Explore
              </Link>
              <Link href="/experiences" className="text-muted-foreground hover:text-foreground transition-colors">
                Experiences
              </Link>
              <Link href="/become-host" className="text-muted-foreground hover:text-foreground transition-colors">
                Become a Host
              </Link>
              <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                Help
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>

              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => setShowLoginModal(true)}>
                    Sign In
                  </Button>
                  <Button size="sm" onClick={() => setShowSignupModal(true)}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link href="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
                  Explore
                </Link>
                <Link href="/experiences" className="text-muted-foreground hover:text-foreground transition-colors">
                  Experiences
                </Link>
                <Link href="/become-host" className="text-muted-foreground hover:text-foreground transition-colors">
                  Become a Host
                </Link>
                <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  {isAuthenticated ? (
                    <div className="flex items-center space-x-2">
                      <UserMenu />
                      <span className="text-sm">Welcome, {user?.name}</span>
                    </div>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start"
                        onClick={() => setShowLoginModal(true)}
                      >
                        Sign In
                      </Button>
                      <Button size="sm" onClick={() => setShowSignupModal(true)}>
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Authentication Modals */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onSwitchToSignup={switchToSignup} />
      <SignupModal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)} onSwitchToLogin={switchToLogin} />
    </>
  )
}
