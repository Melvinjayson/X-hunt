'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  UsersIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'HOST' | 'ADMIN' | 'SUPER_ADMIN';
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING' | 'BANNED';
  emailVerified: boolean;
  totalBookings: number;
  totalSpent: number;
  organizationId?: string;
  organizationName?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      router.push('/auth/signin');
      return;
    }

    fetchUsers();
  }, [session, status, router]);

  const fetchUsers = async () => {
    try {
      // Mock data for now - replace with actual API calls
      const mockUsers: User[] = [
        {
          id: '1',
          name: 'John Smith',
          email: 'john.smith@techcorp.com',
          role: 'USER',
          status: 'ACTIVE',
          emailVerified: true,
          totalBookings: 12,
          totalSpent: 3600,
          organizationId: '1',
          organizationName: 'TechCorp Inc.',
          lastLoginAt: '2024-01-20T14:30:00Z',
          createdAt: '2023-11-15T10:20:00Z',
          updatedAt: '2024-01-20T14:30:00Z'
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah@adventures.com',
          role: 'HOST',
          status: 'ACTIVE',
          emailVerified: true,
          totalBookings: 0,
          totalSpent: 0,
          lastLoginAt: '2024-01-19T09:15:00Z',
          createdAt: '2023-12-01T08:45:00Z',
          updatedAt: '2024-01-19T09:15:00Z'
        },
        {
          id: '3',
          name: 'Michael Chen',
          email: 'michael.chen@globalventures.com',
          role: 'USER',
          status: 'ACTIVE',
          emailVerified: true,
          totalBookings: 28,
          totalSpent: 8400,
          organizationId: '3',
          organizationName: 'Global Ventures',
          lastLoginAt: '2024-01-21T11:22:00Z',
          createdAt: '2023-10-20T16:30:00Z',
          updatedAt: '2024-01-21T11:22:00Z'
        },
        {
          id: '4',
          name: 'Emily Rodriguez',
          email: 'emily@creativeagency.com',
          role: 'USER',
          status: 'PENDING',
          emailVerified: false,
          totalBookings: 0,
          totalSpent: 0,
          organizationId: '4',
          organizationName: 'Creative Agency',
          createdAt: '2024-01-22T08:45:00Z',
          updatedAt: '2024-01-22T08:45:00Z'
        },
        {
          id: '5',
          name: 'David Wilson',
          email: 'david@freelancer.com',
          role: 'USER',
          status: 'SUSPENDED',
          emailVerified: true,
          totalBookings: 5,
          totalSpent: 1200,
          lastLoginAt: '2024-01-10T15:45:00Z',
          createdAt: '2023-09-12T12:15:00Z',
          updatedAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '6',
          name: 'Lisa Thompson',
          email: 'lisa@admin.xhunt.com',
          role: 'ADMIN',
          status: 'ACTIVE',
          emailVerified: true,
          totalBookings: 0,
          totalSpent: 0,
          lastLoginAt: '2024-01-21T16:20:00Z',
          createdAt: '2023-08-01T09:00:00Z',
          updatedAt: '2024-01-21T16:20:00Z'
        }
      ];

      setUsers(mockUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.organizationName?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      ACTIVE: 'bg-green-100 text-green-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      SUSPENDED: 'bg-red-100 text-red-800',
      BANNED: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusStyles[status as keyof typeof statusStyles] || statusStyles.BANNED
      }`}>
        {status}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    const roleStyles = {
      USER: 'bg-blue-100 text-blue-800',
      HOST: 'bg-purple-100 text-purple-800',
      ADMIN: 'bg-red-100 text-red-800',
      SUPER_ADMIN: 'bg-gray-900 text-white'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        roleStyles[role as keyof typeof roleStyles] || roleStyles.USER
      }`}>
        {role === 'SUPER_ADMIN' ? 'SUPER ADMIN' : role}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatLastLogin = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(dateString);
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
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600 mt-1">Manage user accounts, roles, and permissions</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <UserPlusIcon className="h-5 w-5" />
              <span>Add User</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="USER">User</option>
                <option value="HOST">Host</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="PENDING">Pending</option>
                <option value="SUSPENDED">Suspended</option>
                <option value="BANNED">Banned</option>
              </select>
              
              <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FunnelIcon className="h-5 w-5 text-gray-500" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                  Activate
                </button>
                <button className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700">
                  Suspend
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role & Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center space-x-2">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            {user.emailVerified ? (
                              <CheckCircleIcon className="h-4 w-4 text-green-500" title="Email verified" />
                            ) : (
                              <XCircleIcon className="h-4 w-4 text-red-500" title="Email not verified" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.organizationName ? (
                        <div className="text-sm text-gray-900">{user.organizationName}</div>
                      ) : (
                        <span className="text-sm text-gray-500">Individual</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user.totalBookings} bookings
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatCurrency(user.totalSpent)} spent
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatLastLogin(user.lastLoginAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" title="View details">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900" title="Edit user">
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        {user.role !== 'SUPER_ADMIN' && (
                          <button className="text-red-600 hover:text-red-900" title="Delete user">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6 rounded-lg shadow">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
                <span className="font-medium">{users.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
