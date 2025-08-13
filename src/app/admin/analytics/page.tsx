'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  ArrowLeftIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

interface AnalyticsData {
  overview: {
    totalRevenue: number;
    revenueGrowth: number;
    totalUsers: number;
    userGrowth: number;
    totalBookings: number;
    bookingGrowth: number;
    avgBookingValue: number;
    avgBookingGrowth: number;
  };
  revenueByMonth: Array<{ month: string; revenue: number; bookings: number }>;
  usersByMonth: Array<{ month: string; users: number; hosts: number }>;
  topExperiences: Array<{ id: string; name: string; bookings: number; revenue: number }>;
  topOrganizations: Array<{ id: string; name: string; members: number; spent: number }>;
  geographicData: Array<{ country: string; users: number; revenue: number }>;
  conversionMetrics: {
    visitorToSignup: number;
    signupToBooking: number;
    repeatBookingRate: number;
    hostApprovalRate: number;
  };
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      router.push('/auth/signin');
      return;
    }

    fetchAnalytics();
  }, [session, status, router, timeRange]);

  const fetchAnalytics = async () => {
    try {
      // Mock data for now - replace with actual API calls
      const mockAnalytics: AnalyticsData = {
        overview: {
          totalRevenue: 2847392.50,
          revenueGrowth: 12.5,
          totalUsers: 12847,
          userGrowth: 8.3,
          totalBookings: 8934,
          bookingGrowth: 15.2,
          avgBookingValue: 318.75,
          avgBookingGrowth: -2.1
        },
        revenueByMonth: [
          { month: 'Jan', revenue: 180000, bookings: 567 },
          { month: 'Feb', revenue: 195000, bookings: 612 },
          { month: 'Mar', revenue: 210000, bookings: 659 },
          { month: 'Apr', revenue: 225000, bookings: 706 },
          { month: 'May', revenue: 240000, bookings: 753 },
          { month: 'Jun', revenue: 255000, bookings: 800 },
          { month: 'Jul', revenue: 270000, bookings: 847 },
          { month: 'Aug', revenue: 285000, bookings: 894 },
          { month: 'Sep', revenue: 300000, bookings: 941 },
          { month: 'Oct', revenue: 315000, bookings: 988 },
          { month: 'Nov', revenue: 330000, bookings: 1035 },
          { month: 'Dec', revenue: 345000, bookings: 1082 }
        ],
        usersByMonth: [
          { month: 'Jan', users: 850, hosts: 85 },
          { month: 'Feb', users: 920, hosts: 92 },
          { month: 'Mar', users: 1050, hosts: 105 },
          { month: 'Apr', users: 1180, hosts: 118 },
          { month: 'May', users: 1290, hosts: 129 },
          { month: 'Jun', users: 1420, hosts: 142 },
          { month: 'Jul', users: 1550, hosts: 155 },
          { month: 'Aug', users: 1680, hosts: 168 },
          { month: 'Sep', users: 1810, hosts: 181 },
          { month: 'Oct', users: 1940, hosts: 194 },
          { month: 'Nov', users: 2070, hosts: 207 },
          { month: 'Dec', users: 2200, hosts: 220 }
        ],
        topExperiences: [
          { id: '1', name: 'Tokyo Food Tour', bookings: 342, revenue: 85500 },
          { id: '2', name: 'NYC Art Walk', bookings: 298, revenue: 74500 },
          { id: '3', name: 'London History Tour', bookings: 267, revenue: 66750 },
          { id: '4', name: 'Paris Wine Tasting', bookings: 234, revenue: 58500 },
          { id: '5', name: 'Barcelona Architecture', bookings: 201, revenue: 50250 }
        ],
        topOrganizations: [
          { id: '1', name: 'TechCorp Inc.', members: 245, spent: 125000 },
          { id: '2', name: 'Global Ventures', members: 567, spent: 289000 },
          { id: '3', name: 'StartupHub', members: 89, spent: 45000 },
          { id: '4', name: 'Innovation Labs', members: 156, spent: 78000 },
          { id: '5', name: 'Future Systems', members: 234, spent: 117000 }
        ],
        geographicData: [
          { country: 'United States', users: 4523, revenue: 1138000 },
          { country: 'United Kingdom', users: 2156, revenue: 542000 },
          { country: 'Canada', users: 1834, revenue: 461000 },
          { country: 'Australia', users: 1456, revenue: 366000 },
          { country: 'Germany', users: 1289, revenue: 324000 },
          { country: 'France', users: 1067, revenue: 268000 },
          { country: 'Japan', users: 522, revenue: 131000 }
        ],
        conversionMetrics: {
          visitorToSignup: 3.2,
          signupToBooking: 24.5,
          repeatBookingRate: 67.8,
          hostApprovalRate: 89.2
        }
      };

      setAnalytics(mockAnalytics);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-500 hover:text-gray-700">
                <ArrowLeftIcon className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600 mt-1">Comprehensive platform insights and metrics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <ArrowDownTrayIcon className="h-5 w-5" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(analytics?.overview.totalRevenue || 0)}</p>
                <div className="flex items-center mt-1">
                  {(analytics?.overview.revenueGrowth || 0) >= 0 ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${
                    (analytics?.overview.revenueGrowth || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercentage(analytics?.overview.revenueGrowth || 0)}
                  </span>
                </div>
              </div>
              <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{formatNumber(analytics?.overview.totalUsers || 0)}</p>
                <div className="flex items-center mt-1">
                  {(analytics?.overview.userGrowth || 0) >= 0 ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${
                    (analytics?.overview.userGrowth || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercentage(analytics?.overview.userGrowth || 0)}
                  </span>
                </div>
              </div>
              <UsersIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                <p className="text-2xl font-semibold text-gray-900">{formatNumber(analytics?.overview.totalBookings || 0)}</p>
                <div className="flex items-center mt-1">
                  {(analytics?.overview.bookingGrowth || 0) >= 0 ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${
                    (analytics?.overview.bookingGrowth || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercentage(analytics?.overview.bookingGrowth || 0)}
                  </span>
                </div>
              </div>
              <CalendarIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Booking Value</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(analytics?.overview.avgBookingValue || 0)}</p>
                <div className="flex items-center mt-1">
                  {(analytics?.overview.avgBookingGrowth || 0) >= 0 ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${
                    (analytics?.overview.avgBookingGrowth || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercentage(analytics?.overview.avgBookingGrowth || 0)}
                  </span>
                </div>
              </div>
              <ChartBarIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Revenue Trend</h3>
            </div>
            <div className="p-6">
              <div className="h-64 flex items-end justify-between space-x-2">
                {analytics?.revenueByMonth.slice(-6).map((data, index) => (
                  <div key={data.month} className="flex flex-col items-center flex-1">
                    <div className="w-full bg-blue-100 rounded-t" style={{
                      height: `${(data.revenue / Math.max(...analytics.revenueByMonth.map(d => d.revenue))) * 200}px`
                    }}>
                      <div className="w-full bg-blue-600 rounded-t" style={{
                        height: '100%'
                      }}></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                    <span className="text-xs font-medium text-gray-900">{formatCurrency(data.revenue)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Growth Chart */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">User Growth</h3>
            </div>
            <div className="p-6">
              <div className="h-64 flex items-end justify-between space-x-2">
                {analytics?.usersByMonth.slice(-6).map((data, index) => (
                  <div key={data.month} className="flex flex-col items-center flex-1">
                    <div className="w-full bg-green-100 rounded-t" style={{
                      height: `${(data.users / Math.max(...analytics.usersByMonth.map(d => d.users))) * 200}px`
                    }}>
                      <div className="w-full bg-green-600 rounded-t" style={{
                        height: '100%'
                      }}></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                    <span className="text-xs font-medium text-gray-900">{formatNumber(data.users)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Experiences */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Top Experiences</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analytics?.topExperiences.map((experience, index) => (
                  <div key={experience.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{experience.name}</p>
                        <p className="text-xs text-gray-500">{experience.bookings} bookings</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{formatCurrency(experience.revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Organizations */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Top Organizations</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analytics?.topOrganizations.map((org, index) => (
                  <div key={org.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-green-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{org.name}</p>
                        <p className="text-xs text-gray-500">{org.members} members</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{formatCurrency(org.spent)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Metrics */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Conversion Metrics</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{analytics?.conversionMetrics.visitorToSignup}%</p>
                <p className="text-sm text-gray-500 mt-1">Visitor to Signup</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{analytics?.conversionMetrics.signupToBooking}%</p>
                <p className="text-sm text-gray-500 mt-1">Signup to Booking</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{analytics?.conversionMetrics.repeatBookingRate}%</p>
                <p className="text-sm text-gray-500 mt-1">Repeat Booking Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-600">{analytics?.conversionMetrics.hostApprovalRate}%</p>
                <p className="text-sm text-gray-500 mt-1">Host Approval Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Geographic Data */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Geographic Distribution</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics?.geographicData.map((country, index) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{country.country}</span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{formatNumber(country.users)} users</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{formatCurrency(country.revenue)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
