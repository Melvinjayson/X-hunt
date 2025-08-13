"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  MapPin,
  Star,
  DollarSign,
  TrendingUp,
  Shield,
  Settings,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Edit3,
  Trash2,
} from "lucide-react"
import { mockUsers, mockExperiences, mockBookings } from "@/lib/mock-data"

export default function AdminPanelPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Mock admin analytics
  const totalUsers = mockUsers.length
  const totalExperiences = mockExperiences.length
  const totalBookings = mockBookings.length
  const totalRevenue = mockBookings.reduce((sum, booking) => sum + booking.totalAmount, 0)
  const pendingExperiences = mockExperiences.filter((exp) => !exp.featured).length
  const activeUsers = mockUsers.filter((u) => u.role !== "admin").length

  const filteredUsers = mockUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || u.role === selectedFilter
    return matchesSearch && matchesFilter
  })

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Administrator access required to view this panel</CardDescription>
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
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600">Manage platform operations and monitor system health</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-600 border-green-600">
                System Healthy
              </Badge>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* System Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{totalUsers.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{totalExperiences}</p>
                    <p className="text-sm text-gray-600">Active Experiences</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{totalBookings.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Platform Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="experiences">Experience Moderation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="px-3 py-2 border rounded-md text-sm"
                    >
                      <option value="all">All Roles</option>
                      <option value="user">Users</option>
                      <option value="host">Hosts</option>
                      <option value="admin">Admins</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((userData) => (
                    <div key={userData.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                          <AvatarFallback className="bg-blue-600 text-white">
                            {userData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{userData.name}</h4>
                          <p className="text-sm text-gray-600">{userData.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant={
                                userData.role === "admin"
                                  ? "default"
                                  : userData.role === "host"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {userData.role}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Joined {new Date(userData.joinDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                          <Shield className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Moderation Tab */}
          <TabsContent value="experiences" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Pending Approval ({pendingExperiences})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockExperiences
                    .filter((exp) => !exp.featured)
                    .slice(0, 3)
                    .map((experience) => (
                      <div key={experience.id} className="border rounded-lg p-4">
                        <div className="flex gap-4">
                          <img
                            src={experience.images[0] || "/placeholder.svg"}
                            alt={experience.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{experience.title}</h4>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{experience.description}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="h-4 w-4" />
                              {experience.location}
                              <span>•</span>
                              <span>${experience.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Recently Approved
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockExperiences
                    .filter((exp) => exp.featured)
                    .slice(0, 3)
                    .map((experience) => (
                      <div key={experience.id} className="border rounded-lg p-4">
                        <div className="flex gap-4">
                          <img
                            src={experience.images[0] || "/placeholder.svg"}
                            alt={experience.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{experience.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {experience.rating}
                              <span>•</span>
                              <span>{experience.bookings} bookings</span>
                            </div>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Active
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            <Edit3 className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
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
                    Platform Growth
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">+24%</div>
                      <p className="text-sm text-gray-600">User Growth</p>
                      <p className="text-xs text-gray-500">vs last month</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">+18%</div>
                      <p className="text-sm text-gray-600">Revenue Growth</p>
                      <p className="text-xs text-gray-500">vs last month</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">User Activity</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Daily Active Users</span>
                        <span className="font-semibold">1,247</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Weekly Active Users</span>
                        <span className="font-semibold">4,892</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Monthly Active Users</span>
                        <span className="font-semibold">12,456</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Conversion Metrics</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Visitor to User</span>
                          <span className="text-sm font-semibold">12.4%</span>
                        </div>
                        <Progress value={12.4} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">User to Booking</span>
                          <span className="text-sm font-semibold">8.7%</span>
                        </div>
                        <Progress value={8.7} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
                    <p className="text-sm text-gray-600">Total Platform Revenue</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Revenue Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Commission (15%)</span>
                        <span className="font-semibold text-green-600">
                          ${Math.round(totalRevenue * 0.15).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Host Earnings (85%)</span>
                        <span className="font-semibold">${Math.round(totalRevenue * 0.85).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Top Categories</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Hiking & Trekking</span>
                        <span className="font-semibold">32%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Water Sports</span>
                        <span className="font-semibold">24%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Rock Climbing</span>
                        <span className="font-semibold">18%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Wildlife Tours</span>
                        <span className="font-semibold">15%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Other</span>
                        <span className="font-semibold">11%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Platform Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenance">Maintenance Mode</Label>
                        <p className="text-sm text-gray-600">Enable to restrict platform access</p>
                      </div>
                      <Switch id="maintenance" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="registration">New User Registration</Label>
                        <p className="text-sm text-gray-600">Allow new users to sign up</p>
                      </div>
                      <Switch id="registration" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-approve">Auto-approve Experiences</Label>
                        <p className="text-sm text-gray-600">Automatically approve new experiences</p>
                      </div>
                      <Switch id="auto-approve" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="commission">Platform Commission (%)</Label>
                      <Input id="commission" type="number" defaultValue="15" className="w-24" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="min-price">Minimum Experience Price ($)</Label>
                      <Input id="min-price" type="number" defaultValue="25" className="w-32" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Server Status</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Operational
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Database Status</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Healthy
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Payment Gateway</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Connected
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Email Service</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Active
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Recent Activity</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last backup</span>
                        <span>2 hours ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">System update</span>
                        <span>1 day ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Security scan</span>
                        <span>3 days ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full bg-transparent" variant="outline">
                      Download System Report
                    </Button>
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
