'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { CalendarIcon, CurrencyDollarIcon, MapPinIcon, UsersIcon, ChartBarIcon, StarIcon } from '@heroicons/react/24/outline'

export default function HostPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading
    if (!session) {
      router.push('/auth/login')
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to your Host Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your experiences, bookings, and earnings all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Bookings</h3>
            <CalendarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">0</div>
          <p className="text-xs text-gray-500 mt-1">
            No bookings yet
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Earnings</h3>
            <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">$0</div>
          <p className="text-xs text-gray-500 mt-1">
            Start hosting to earn
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Active Experiences</h3>
            <MapPinIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">0</div>
          <p className="text-xs text-gray-500 mt-1">
            Create your first experience
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
              <UsersIcon className="h-5 w-5" />
              Quick Actions
            </h3>
            <p className="text-sm text-gray-600">
              Get started with hosting on X-Hunt
            </p>
          </div>
          <div className="space-y-3">
            <Link href="/host/experiences" className="flex items-center w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <MapPinIcon className="mr-3 h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Manage Experiences</span>
            </Link>
            <Link href="/host/bookings" className="flex items-center w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <CalendarIcon className="mr-3 h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">View Bookings</span>
            </Link>
            <Link href="/host/earnings" className="flex items-center w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <CurrencyDollarIcon className="mr-3 h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Track Earnings</span>
            </Link>
            <Link href="/host/insights" className="flex items-center w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <ChartBarIcon className="mr-3 h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">View Insights</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
              <StarIcon className="h-5 w-5" />
              Host Tips
            </h3>
            <p className="text-sm text-gray-600">
              Tips to become a successful host
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Create compelling experiences</h4>
              <p className="text-sm text-gray-600">
                Write detailed descriptions and add high-quality photos to attract more guests.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Respond quickly</h4>
              <p className="text-sm text-gray-600">
                Quick responses to inquiries lead to more bookings and better reviews.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Provide excellent service</h4>
              <p className="text-sm text-gray-600">
                Great experiences lead to positive reviews and repeat customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}