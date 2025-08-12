'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  UsersIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CogIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalUsers: number;
  totalHosts: number;
  totalOrganizations: number;
  totalBookings: number;
  totalRevenue: number;
  platformFees: number;
  activeUsers: number;
  newSignups: number;
}

interface RecentActivity {
  id: string;
  type: 'user_signup' | 'booking_created' | 'organization_created' | 'host_approved';
  description: string;
  timestamp: string;
  user?: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      router.push('/auth/signin');
      return;
    }

    // Fetch dashboard data
    fetchDashboardData();
  }, [session, status, router]);

  const fetchDashboardData = async () => {
    try {
      // Mock data for now - replace with actual API calls
      setStats({
        totalUsers: 12847,
        totalHosts: 1284,
        totalOrganizations: 156,
        totalBookings: 8934,
        totalRevenue: 2847392.50,
        platformFees: 284739.25,
        activeUsers: 3421,
        newSignups: 127
      });

      setRecentActivity([
        {
          id: '1',
          type: 'organization_created',
          description: 'TechCorp Inc. created organization account',
          timestamp: '2 minutes ago',
          user: 'john@techcorp.com'
        },
        {
          id: '2',
          type: 'host_approved',
          description: 'New host application approved',
          timestamp: '15 minutes ago',
          user: 'sarah@adventures.com'
        },
        {
          id: '3',
          type: 'booking_created',
          description: 'High-value booking created ($2,500)',
          timestamp: '1 hour ago',
          user: 'enterprise@bigcorp.com'
        },
        {
          id: '4',
          type: 'user_signup',
          description: 'Bulk user signup from organization',
          timestamp: '2 hours ago',
          user: 'hr@startup.io'
        }
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your X-Hunt enterprise platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome back, {session.user.name}</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UsersIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{formatNumber(stats?.totalUsers || 0)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BuildingOfficeIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Organizations</p>
                <p className="text-2xl font-semibold text-gray-900">{formatNumber(stats?.totalOrganizations || 0)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats?.totalRevenue || 0)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ArrowTrendingUpIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900">{formatNumber(stats?.activeUsers || 0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Link href="/admin/users" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <UsersIcon className="h-8 w-8 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Manage Users</span>
                  </Link>
                  
                  <Link href="/admin/organizations" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <BuildingOfficeIcon className="h-8 w-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Organizations</span>
                  </Link>
                  
                  <Link href="/admin/analytics" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <ChartBarIcon className="h-8 w-8 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Analytics</span>
                  </Link>
                  
                  <Link href="/admin/experiences" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <MapPinIcon className="h-8 w-8 text-red-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Experiences</span>
                  </Link>
                  
                  <Link href="/admin/bookings" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <CalendarIcon className="h-8 w-8 text-yellow-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Bookings</span>
                  </Link>
                  
                  <Link href="/admin/settings" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <CogIcon className="h-8 w-8 text-gray-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Settings</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {activity.type === 'organization_created' && <BuildingOfficeIcon className="h-5 w-5 text-green-600" />}
                      {activity.type === 'host_approved' && <UserGroupIcon className="h-5 w-5 text-blue-600" />}
                      {activity.type === 'booking_created' && <CalendarIcon className="h-5 w-5 text-yellow-600" />}
                      {activity.type === 'user_signup' && <UsersIcon className="h-5 w-5 text-purple-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      {activity.user && (
                        <p className="text-xs text-blue-600">{activity.user}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Platform Fees</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats?.platformFees || 0)}</p>
              </div>
              <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Hosts</p>
                <p className="text-2xl font-semibold text-gray-900">{formatNumber(stats?.totalHosts || 0)}</p>
              </div>
              <UserGroupIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">New Signups</p>
                <p className="text-2xl font-semibold text-gray-900">{formatNumber(stats?.newSignups || 0)}</p>
              </div>
              <ArrowTrendingUpIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}