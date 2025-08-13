"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, Star, Trophy, Users, Heart, Camera, Edit3, Save, X } from "lucide-react"
import { mockBookings, mockRewards, mockReviews } from "@/lib/mock-data"
import { AIRecommendations } from "@/components/ai/ai-recommendations"
import { OnboardingProgress } from "@/components/onboarding/progress-indicator"
import { FeatureHighlight } from "@/components/onboarding/feature-highlight"

export default function DashboardPage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    bio: "Adventure enthusiast who loves exploring new places and trying exciting activities.",
    location: "San Francisco, CA",
    emergencyContact: "Jane Doe - +1 (555) 987-6543",
  })

  const userBookings = mockBookings.filter((booking) => booking.userId === user?.id)
  const upcomingBookings = userBookings.filter((booking) => booking.status === "confirmed")
  const pastBookings = userBookings.filter((booking) => booking.status === "completed")
  const userReviews = mockReviews.filter((review) => review.userId === user?.id)

  const handleSaveProfile = () => {
    // Mock save functionality
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please log in to view your dashboard</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OnboardingProgress />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-blue-600 text-white text-xl">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600">Manage your adventures and track your progress</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                    <p className="text-sm text-gray-600">Upcoming Adventures</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{mockRewards.points}</p>
                    <p className="text-sm text-gray-600">Reward Points</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Star className="h-8 w-8 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">{pastBookings.length}</p>
                    <p className="text-sm text-gray-600">Completed Adventures</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{mockRewards.level}</p>
                    <p className="text-sm text-gray-600">Adventure Level</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8" data-onboarding="recommendations">
          <AIRecommendations userId={user.id} />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Adventures
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingBookings.length > 0 ? (
                    upcomingBookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{booking.experienceTitle}</h4>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(booking.date).toLocaleDateString()}
                          </p>
                          <p className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {booking.participants} participants
                          </p>
                          <p className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {booking.location}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="font-semibold text-lg">${booking.totalAmount}</span>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">No upcoming bookings</p>
                  )}
                </CardContent>
              </Card>

              {/* Past Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Past Adventures
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pastBookings.length > 0 ? (
                    pastBookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{booking.experienceTitle}</h4>
                          <Badge variant="secondary">{booking.status}</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(booking.date).toLocaleDateString()}
                          </p>
                          <p className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {booking.participants} participants
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="font-semibold text-lg">${booking.totalAmount}</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Leave Review
                            </Button>
                            <Button size="sm" variant="outline">
                              Book Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">No past bookings</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Manage your personal information and preferences</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-blue-600 text-white text-2xl">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.location}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        rows={3}
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.bio}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="emergency">Emergency Contact</Label>
                    {isEditing ? (
                      <Input
                        id="emergency"
                        value={profileData.emergencyContact}
                        onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.emergencyContact}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Points & Level */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Adventure Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{mockRewards.points}</div>
                    <p className="text-gray-600">Total Points Earned</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Level {mockRewards.level}</span>
                      <span className="text-sm text-gray-600">{mockRewards.points % 1000}/1000 to next level</span>
                    </div>
                    <Progress value={(mockRewards.points % 1000) / 10} className="h-3" />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">How to earn points:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Complete an adventure: 100 points</li>
                      <li>• Leave a review: 25 points</li>
                      <li>• Refer a friend: 200 points</li>
                      <li>• Share on social media: 10 points</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle>Achievement Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {mockRewards.badges.map((badge, index) => (
                      <div key={index} className="text-center p-4 border rounded-lg">
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <h4 className="font-semibold text-sm">{badge.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Social Tab */}
          <TabsContent value="social" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* My Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    My Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{review.experienceTitle}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                      <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Favorites */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Favorite Experiences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Mountain Peak Hiking</h4>
                      <p className="text-sm text-gray-600 mb-2">Challenging hike with breathtaking views</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Saved 2 weeks ago</span>
                        <Button size="sm" variant="outline">
                          Book Now
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Rock Climbing Adventure</h4>
                      <p className="text-sm text-gray-600 mb-2">Perfect for beginners and experts</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Saved 1 month ago</span>
                        <Button size="sm" variant="outline">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <FeatureHighlight
          featureId="ai-recommendations"
          title="AI-Powered Recommendations"
          description="Get personalized adventure suggestions based on your preferences and booking history."
          benefits={[
            "Discover experiences tailored to your interests",
            "Save time with smart filtering",
            "Transparent AI explanations",
            "Privacy-first approach",
          ]}
          ctaText="Enable Personalization"
          position="bottom-right"
          delay={5000}
        />
      </div>
    </div>
  )
}
