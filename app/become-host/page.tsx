"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { DollarSign, Calendar, Users, Shield, Star, CheckCircle, ArrowRight } from "lucide-react"

export default function BecomeHostPage() {
  const { user, login } = useAuth()
  const router = useRouter()
  const [showSignup, setShowSignup] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    experienceType: "",
    description: "",
  })

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn Extra Income",
      description: "Set your own prices and earn money sharing your passion",
      stat: "Average $150/day",
    },
    {
      icon: Calendar,
      title: "Flexible Schedule",
      description: "Host when it works for you - full control over your calendar",
      stat: "You decide when",
    },
    {
      icon: Users,
      title: "Meet Amazing People",
      description: "Connect with adventurers from around the world",
      stat: "Global community",
    },
    {
      icon: Shield,
      title: "Safety & Support",
      description: "24/7 support, insurance coverage, and safety tools",
      stat: "Always protected",
    },
  ]

  const steps = [
    {
      number: 1,
      title: "Create Your Profile",
      description: "Tell us about yourself and your adventure expertise",
    },
    {
      number: 2,
      title: "List Your Experience",
      description: "Add photos, set pricing, and describe your unique adventure",
    },
    {
      number: 3,
      title: "Get Verified",
      description: "Complete our quick verification process for safety",
    },
    {
      number: 4,
      title: "Start Hosting",
      description: "Welcome your first guests and start earning",
    },
  ]

  const handleGetStarted = () => {
    if (user) {
      if (user.role === "host") {
        router.push("/host")
      } else {
        // Upgrade user to host role
        const updatedUser = { ...user, role: "host" as const }
        login(updatedUser.email, "password", updatedUser.role)
        router.push("/host")
      }
    } else {
      setShowSignup(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock host registration
    login(formData.email, "password", "host")
    router.push("/host")
  }

  if (showSignup && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Join as a Host</h1>
            <p className="text-gray-600">Complete your profile to start hosting adventures</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Host Registration</CardTitle>
              <CardDescription>Tell us about yourself and the experiences you'd like to offer</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State/Country"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="experienceType">Type of Experience</Label>
                  <Input
                    id="experienceType"
                    placeholder="e.g., Hiking, Rock Climbing, Photography Tours"
                    value={formData.experienceType}
                    onChange={(e) => setFormData({ ...formData, experienceType: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Tell us about your experience</Label>
                  <Textarea
                    id="description"
                    placeholder="What makes your adventures special? What's your background?"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setShowSignup(false)} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Create Host Account
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Share Your Passion.
            <br />
            <span className="text-blue-200">Earn While You Explore.</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Turn your outdoor expertise into income. Host unique adventures, meet incredible people, and build a
            thriving business doing what you love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
              onClick={handleGetStarted}
            >
              {user?.role === "host" ? "Go to Dashboard" : "Start Hosting Today"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 text-blue-100">
              <CheckCircle className="h-5 w-5" />
              <span>Free to join • No upfront costs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Hosts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">$2.5M+</div>
              <div className="text-gray-600">Earned by Hosts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">4.9★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Host with X-hunt?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of hosts who are building successful adventure businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{benefit.description}</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {benefit.stat}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in just 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Host Success Stories</h2>
            <p className="text-xl text-gray-600">Real hosts, real results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    SM
                  </div>
                  <div>
                    <CardTitle className="text-lg">Sarah Martinez</CardTitle>
                    <CardDescription>Mountain Guide, Colorado</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">4.9 (127 reviews)</span>
                </div>
                <p className="text-gray-600 mb-4">
                  "I've been hosting hiking tours for 2 years and earned over $45,000. The platform makes it so easy to
                  manage bookings and connect with adventurers."
                </p>
                <Badge className="bg-green-100 text-green-700">$45K+ earned</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    MJ
                  </div>
                  <div>
                    <CardTitle className="text-lg">Mike Johnson</CardTitle>
                    <CardDescription>Rock Climbing Instructor, Utah</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">5.0 (89 reviews)</span>
                </div>
                <p className="text-gray-600 mb-4">
                  "X-hunt helped me turn my passion into a full-time business. The safety tools and support team are
                  incredible."
                </p>
                <Badge className="bg-blue-100 text-blue-700">Full-time host</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    AL
                  </div>
                  <div>
                    <CardTitle className="text-lg">Anna Lee</CardTitle>
                    <CardDescription>Photography Tours, Iceland</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">4.8 (203 reviews)</span>
                </div>
                <p className="text-gray-600 mb-4">
                  "I love sharing Iceland's beauty with photographers from around the world. The international reach is
                  amazing!"
                </p>
                <Badge className="bg-purple-100 text-purple-700">Global reach</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Hosting Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful hosts and start earning from your passion today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
              onClick={handleGetStarted}
            >
              {user?.role === "host" ? "Go to Dashboard" : "Get Started Now"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg bg-transparent"
              onClick={() => router.push("/explore")}
            >
              Explore Experiences First
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-6">Questions? Contact our host support team at host-support@x-hunt.com</p>
        </div>
      </section>
    </div>
  )
}
