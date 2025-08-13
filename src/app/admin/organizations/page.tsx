'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BuildingOfficeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  industry?: string;
  size: 'STARTUP' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE';
  plan: 'FREE' | 'BASIC' | 'PROFESSIONAL' | 'ENTERPRISE';
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING' | 'CANCELLED';
  memberCount: number;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
}

export default function OrganizationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPlan, setFilterPlan] = useState<string>('all');

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      router.push('/auth/signin');
      return;
    }

    fetchOrganizations();
  }, [session, status, router]);

  const fetchOrganizations = async () => {
    try {
      // Mock data for now - replace with actual API calls
      const mockOrganizations: Organization[] = [
        {
          id: '1',
          name: 'TechCorp Inc.',
          slug: 'techcorp-inc',
          description: 'Leading technology company specializing in AI solutions',
          website: 'https://techcorp.com',
          industry: 'Technology',
          size: 'LARGE',
          plan: 'ENTERPRISE',
          status: 'ACTIVE',
          memberCount: 245,
          totalSpent: 125000,
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-20T14:22:00Z'
        },
        {
          id: '2',
          name: 'StartupHub',
          slug: 'startuphub',
          description: 'Innovation hub for emerging startups',
          website: 'https://startuphub.io',
          industry: 'Consulting',
          size: 'MEDIUM',
          plan: 'PROFESSIONAL',
          status: 'ACTIVE',
          memberCount: 89,
          totalSpent: 45000,
          createdAt: '2024-01-10T09:15:00Z',
          updatedAt: '2024-01-18T16:45:00Z'
        },
        {
          id: '3',
          name: 'Global Ventures',
          slug: 'global-ventures',
          description: 'International investment firm',
          website: 'https://globalventures.com',
          industry: 'Finance',
          size: 'ENTERPRISE',
          plan: 'ENTERPRISE',
          status: 'ACTIVE',
          memberCount: 567,
          totalSpent: 289000,
          createdAt: '2023-12-05T11:20:00Z',
          updatedAt: '2024-01-19T13:30:00Z'
        },
        {
          id: '4',
          name: 'Creative Agency',
          slug: 'creative-agency',
          description: 'Full-service creative and marketing agency',
          website: 'https://creativeagency.com',
          industry: 'Marketing',
          size: 'SMALL',
          plan: 'BASIC',
          status: 'PENDING',
          memberCount: 23,
          totalSpent: 8500,
          createdAt: '2024-01-22T08:45:00Z',
          updatedAt: '2024-01-22T08:45:00Z'
        },
        {
          id: '5',
          name: 'EcoSolutions',
          slug: 'ecosolutions',
          description: 'Sustainable technology solutions',
          website: 'https://ecosolutions.org',
          industry: 'Environmental',
          size: 'STARTUP',
          plan: 'FREE',
          status: 'SUSPENDED',
          memberCount: 12,
          totalSpent: 2500,
          createdAt: '2024-01-08T14:30:00Z',
          updatedAt: '2024-01-20T10:15:00Z'
        }
      ];

      setOrganizations(mockOrganizations);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      setLoading(false);
    }
  };

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (org.industry?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    const matchesStatus = filterStatus === 'all' || org.status === filterStatus;
    const matchesPlan = filterPlan === 'all' || org.plan === filterPlan;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      ACTIVE: 'bg-green-100 text-green-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      SUSPENDED: 'bg-red-100 text-red-800',
      CANCELLED: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusStyles[status as keyof typeof statusStyles] || statusStyles.CANCELLED
      }`}>
        {status}
      </span>
    );
  };

  const getPlanBadge = (plan: string) => {
    const planStyles = {
      FREE: 'bg-gray-100 text-gray-800',
      BASIC: 'bg-blue-100 text-blue-800',
      PROFESSIONAL: 'bg-purple-100 text-purple-800',
      ENTERPRISE: 'bg-gold-100 text-gold-800 bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        planStyles[plan as keyof typeof planStyles] || planStyles.FREE
      }`}>
        {plan}
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
                <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
                <p className="text-gray-600 mt-1">Manage organization accounts and settings</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <PlusIcon className="h-5 w-5" />
              <span>Add Organization</span>
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
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="PENDING">Pending</option>
                <option value="SUSPENDED">Suspended</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Plans</option>
                <option value="FREE">Free</option>
                <option value="BASIC">Basic</option>
                <option value="PROFESSIONAL">Professional</option>
                <option value="ENTERPRISE">Enterprise</option>
              </select>
              
              <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FunnelIcon className="h-5 w-5 text-gray-500" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Organizations Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan & Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Members
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrganizations.map((org) => (
                  <tr key={org.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{org.name}</div>
                          <div className="text-sm text-gray-500">{org.industry}</div>
                          {org.website && (
                            <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">
                              {org.website}
                            </a>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {getPlanBadge(org.plan)}
                        {getStatusBadge(org.status)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <UsersIcon className="h-4 w-4 text-gray-400 mr-1" />
                        {org.memberCount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <CurrencyDollarIcon className="h-4 w-4 text-gray-400 mr-1" />
                        {formatCurrency(org.totalSpent)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(org.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-5 w-5" />
                        </button>
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrganizations.length}</span> of{' '}
                <span className="font-medium">{organizations.length}</span> results
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
