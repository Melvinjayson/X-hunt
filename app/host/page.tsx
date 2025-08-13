"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  MapPin,
  Star,
  DollarSign,
  Eye,
  TrendingUp,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import { mockExperiences, mockBookings } from "@/lib/mock-data"

export default function HostDashboardPage() {
  const { user } = useAuth()
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Mock host data
  const hostExperiences = mockExperiences.filter((exp) => exp.hostId === user?.id)
  const hostBookings = mockBookings.filter((booking) =>
    hostExperiences.some((exp) => exp.title === booking.experienceTitle),
  )

  const pendingBookings = hostBookings.filter((booking) => booking.status === "pending")
  const confirmedBookings = hostBookings.filter((booking) => booking.status === "confirmed")
  const completedBookings = hostBookings.filter((booking) => booking.status === "completed")

  const totalEarnings = completedBookings.reduce((sum, booking) => sum + booking.totalAmount, 0)
  const monthlyEarnings = completedBookings
    .filter((booking) => new Date(booking.date).getMonth() === new Date().getMonth())
    .reduce((sum, booking) => sum + booking.totalAmount, 0)

  if (!user || user.role !== "host") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Host access required to view this dashboard</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Host Dashboard</h1>
              <p className="text-gray-600">Manage your experiences and track your success</p>
            </div>
            <Button onClick={() => setShowCreateForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Experience
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">${totalEarnings.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{hostBookings.length}</p>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Star className="h-8 w-8 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">4.8</p>
                    <p className="text-sm text-gray-600">Average Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Eye className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">2.4K</p>
                    <p className="text-sm text-gray-600">Profile Views</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="experiences" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="experiences">My Experiences</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Experiences Tab */}
          <TabsContent value="experiences" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {hostExperiences.map((experience) => (
                <Card key={experience.id}>
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={experience.images[0] || "/placeholder.svg"}
                      alt={experience.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant={experience.featured ? "default" : "secondary"}>
                        {experience.featured ? "Featured" : "Standard"}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{experience.title}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{experience.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{experience.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <MapPin className="h-4 w-4" />
                      {experience.location}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">${experience.price}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pending Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    Pending Approval
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">{booking.experienceTitle}</h4>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <p>{new Date(booking.date).toLocaleDateString()}</p>
                        <p>{booking.participants} participants</p>
                        <p className="font-semibold">${booking.totalAmount}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                          <XCircle className="h-4 w-4 mr-1" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Confirmed Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Confirmed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {confirmedBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">{booking.experienceTitle}</h4>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <p>{new Date(booking.date).toLocaleDateString()}</p>
                        <p>{booking.participants} participants</p>
                        <p className="font-semibold">${booking.totalAmount}</p>
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        Contact Guest
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Completed Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    Completed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {completedBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">{booking.experienceTitle}</h4>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <p>{new Date(booking.date).toLocaleDateString()}</p>
                        <p>{booking.participants} participants</p>
                        <p className="font-semibold text-green-600">${booking.totalAmount}</p>
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        View Review
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Earnings Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">${totalEarnings.toLocaleString()}</div>
                      <p className="text-sm text-gray-600">Total Earnings</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">${monthlyEarnings.toLocaleString()}</div>
                      <p className="text-sm text-gray-600">This Month</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Monthly Goal</span>
                      <span className="text-sm text-gray-600">${monthlyEarnings}/5000</span>
                    </div>
                    <Progress value={(monthlyEarnings / 5000) * 100} className="h-3" />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Recent Payouts</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-sm">Dec 15, 2024</span>
                        <span className="font-semibold text-green-600">+$1,250</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-sm">Dec 1, 2024</span>
                        <span className="font-semibold text-green-600">+$890</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm">Nov 15, 2024</span>
                        <span className="font-semibold text-green-600">+$1,100</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Experiences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {hostExperiences.slice(0, 3).map((experience, index) => (
                      <div key={experience.id} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                        <img
                          src={experience.images[0] || "/placeholder.svg"}
                          alt={experience.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{experience.title}</h4>
                          <p className="text-xs text-gray-600">{experience.bookings} bookings</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">
                            ${(experience.price * experience.bookings).toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600">revenue</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">2,431</div>
                      <p className="text-sm text-gray-600">Profile Views</p>
                      <p className="text-xs text-green-600">+12% this month</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">18%</div>
                      <p className="text-sm text-gray-600">Conversion Rate</p>
                      <p className="text-xs text-green-600">+3% this month</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Booking Trends</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">This Week</span>
                        <span className="font-semibold">12 bookings</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Last Week</span>
                        <span className="font-semibold">8 bookings</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Average/Week</span>
                        <span className="font-semibold">10 bookings</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Guest Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">4.8</div>
                    <div className="flex justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">Average Rating (127 reviews)</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-8">5★</span>
                      <Progress value={85} className="flex-1 h-2" />
                      <span className="text-sm text-gray-600">85%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-8">4★</span>
                      <Progress value={12} className="flex-1 h-2" />
                      <span className="text-sm text-gray-600">12%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-8">3★</span>
                      <Progress value={2} className="flex-1 h-2" />
                      <span className="text-sm text-gray-600">2%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-8">2★</span>
                      <Progress value={1} className="flex-1 h-2" />
                      <span className="text-sm text-gray-600">1%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-8">1★</span>
                      <Progress value={0} className="flex-1 h-2" />
                      <span className="text-sm text-gray-600">0%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
