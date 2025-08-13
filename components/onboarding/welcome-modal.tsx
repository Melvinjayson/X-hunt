"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Mountain, Users, Shield, Sparkles, ArrowRight, X } from "lucide-react"
import { useOnboarding } from "@/lib/onboarding-context"

export function WelcomeModal() {
  const { showWelcome, setShowWelcome, startOnboarding, skipOnboarding } = useOnboarding()
  const [selectedRole, setSelectedRole] = useState<"user" | "host" | null>(null)

  const handleGetStarted = () => {
    if (selectedRole) {
      startOnboarding(selectedRole)
    }
  }

  const handleSkip = () => {
    skipOnboarding()
  }

  return (
    <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-foreground">Welcome to X-hunt!</DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto flex items-center justify-center">
              <Mountain className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Your Adventure Awaits</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover incredible experiences, connect with amazing hosts, and create unforgettable memories. Let's get
              you started on your journey.
            </p>
          </div>

          {/* Features Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">AI-Powered Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized adventure suggestions based on your preferences and interests.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Safety First</h3>
                <p className="text-sm text-muted-foreground">
                  All experiences are vetted with AI-powered safety assessments and verified hosts.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Community Driven</h3>
                <p className="text-sm text-muted-foreground">
                  Join a community of adventurers and hosts passionate about unique experiences.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Role Selection */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center text-foreground">How would you like to get started?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Card
                className={`cursor-pointer transition-all ${
                  selectedRole === "user"
                    ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/50"
                    : "hover:shadow-md hover:bg-muted/50"
                }`}
                onClick={() => setSelectedRole("user")}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mountain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-foreground">I'm an Adventurer</h4>
                        <Badge variant="secondary">Most Popular</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Looking to discover and book amazing experiences around the world.
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Browse thousands of unique experiences</li>
                        <li>• Get AI-powered recommendations</li>
                        <li>• Easy booking and payment</li>
                        <li>• Earn rewards and track adventures</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${
                  selectedRole === "host"
                    ? "ring-2 ring-green-500 bg-green-50 dark:bg-green-950/50"
                    : "hover:shadow-md hover:bg-muted/50"
                }`}
                onClick={() => setSelectedRole("host")}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-foreground">I'm a Host</h4>
                        <Badge variant="outline">Earn Money</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Ready to share unique experiences and earn money doing what you love.
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Create and manage experiences</li>
                        <li>• Set your own pricing and schedule</li>
                        <li>• AI-powered safety and quality tools</li>
                        <li>• Track earnings and analytics</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <Button variant="ghost" onClick={handleSkip}>
              Skip for now
            </Button>
            <Button onClick={handleGetStarted} disabled={!selectedRole} className="min-w-[140px]">
              Get Started
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
