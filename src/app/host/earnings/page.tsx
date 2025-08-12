'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowPathIcon,
  CalendarIcon,
  BanknotesIcon,
  CreditCardIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function HostEarningsPage() {
  const [timeframe, setTimeframe] = useState('month');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for earnings
  const earningsData = {
    totalEarnings: 3505,
    pendingPayouts: 450,
    availableBalance: 255,
    totalBookings: 42,
    averageRating: 4.8,
    completionRate: 95,
    monthlyEarnings: [
      { month: 'Jan', amount: 320 },
      { month: 'Feb', amount: 340 },
      { month: 'Mar', amount: 380 },
      { month: 'Apr', amount: 420 },
      { month: 'May', amount: 450 },
      { month: 'Jun', amount: 520 },
      { month: 'Jul', amount: 480 },
      { month: 'Aug', amount: 520 },
      { month: 'Sep', amount: 540 },
      { month: 'Oct', amount: 580 },
      { month: 'Nov', amount: 0 },
      { month: 'Dec', amount: 0 },
    ],
    recentTransactions: [
      {
        id: 'T1001',
        date: '2023-10-28',
        description: 'Payout to Bank Account ****1234',
        amount: -800,
        type: 'payout',
      },
      {
        id: 'T1002',
        date: '2023-10-25',
        description: 'Booking #B1003 - Hidden Waterfall Hike',
        amount: 165,
        type: 'booking',
      },
      {
        id: 'T1003',
        date: '2023-10-20',
        description: 'Booking #B1002 - Urban Street Art Tour',
        amount: 180,
        type: 'booking',
      },
      {
        id: 'T1004',
        date: '2023-10-15',
        description: 'Booking #B1004 - Hidden Waterfall Hike',
        amount: 110,
        type: 'booking',
      },
      {
        id: 'T1005',
        date: '2023-10-10',
        description: 'Payout to Bank Account ****1234',
        amount: -750,
        type: 'payout',
      },
      {
        id: 'T1006',
        date: '2023-10-05',
        description: 'Booking #B1001 - Urban Street Art Tour',
        amount: 90,
        type: 'booking',
      },
    ],
    paymentMethods: [
      {
        id: 'PM001',
        type: 'bank',
        name: 'Chase Bank',
        lastFour: '1234',
        isDefault: true,
      },
      {
        id: 'PM002',
        type: 'card',
        name: 'Visa',
        lastFour: '5678',
        isDefault: false,
      },
    ],
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Calculate the maximum value for the chart
  const maxEarnings = Math.max(...earningsData.monthlyEarnings.map(month => month.amount));
  
  // Function to get the height percentage for the chart bars
  const getBarHeight = (amount: number) => {
    return maxEarnings > 0 ? (amount / maxEarnings) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-8 md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Earnings
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Track your earnings, manage payouts, and view financial reports
              </p>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
              <button
                type="button"
                onClick={handleRefresh}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <ArrowPathIcon className={`-ml-0.5 mr-1.5 h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} aria-hidden="true" />
                Refresh
              </button>
              <button
                type="button"
                className="ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <ArrowDownTrayIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                Download Report
              </button>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BanknotesIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">Total Earnings</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">${earningsData.totalEarnings.toLocaleString()}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    View all earnings
                  </Link>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CreditCardIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">Available for Payout</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">${earningsData.availableBalance.toLocaleString()}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    Request payout
                  </Link>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CalendarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">Pending Earnings</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">${earningsData.pendingPayouts.toLocaleString()}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    View pending bookings
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Earnings chart */}
          <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">Earnings Overview</h3>
                  <p className="mt-1 text-sm text-gray-500">View your earnings over time</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <select
                    id="timeframe"
                    name="timeframe"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                  >
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                    <option value="all">All Time</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <div className="h-64">
                  <div className="flex h-full items-end">
                    {earningsData.monthlyEarnings.map((month) => (
                      <div key={month.month} className="relative mx-auto flex w-full max-w-[40px] flex-1 flex-col items-center">
                        <div
                          className={`w-full rounded-t ${month.amount > 0 ? 'bg-primary-600' : 'bg-gray-200'}`}
                          style={{ height: `${getBarHeight(month.amount)}%` }}
                        ></div>
                        <div className="mt-2 text-xs font-medium text-gray-500">{month.month}</div>
                        <div className="absolute bottom-[calc(100%+8px)] text-xs font-semibold">
                          {month.amount > 0 ? `$${month.amount}` : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent transactions */}
          <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Transactions</h3>
              <div className="mt-6 flow-root">
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                  {earningsData.recentTransactions.map((transaction) => (
                    <li key={transaction.id} className="py-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {transaction.type === 'booking' ? (
                              <CalendarIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                            ) : (
                              <BanknotesIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                            )}
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <p className={`text-sm font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.amount >= 0 ? '+' : ''}
                            ${Math.abs(transaction.amount).toLocaleString()}
                          </p>
                          {transaction.amount >= 0 ? (
                            <ArrowUpIcon className="ml-1 h-4 w-4 text-green-500" aria-hidden="true" />
                          ) : (
                            <ArrowDownIcon className="ml-1 h-4 w-4 text-red-500" aria-hidden="true" />
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <Link
                  href="#"
                  className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  View all transactions
                </Link>
              </div>
            </div>
          </div>

          {/* Payment methods */}
          <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">Payment Methods</h3>
                  <p className="mt-1 text-sm text-gray-500">Manage your payout methods</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    className="block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    Add payment method
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <ul role="list" className="divide-y divide-gray-200">
                  {earningsData.paymentMethods.map((method) => (
                    <li key={method.id} className="flex items-center justify-between py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {method.type === 'bank' ? (
                            <BanknotesIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                          ) : (
                            <CreditCardIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {method.name} •••• {method.lastFour}
                            {method.isDefault && (
                              <span className="ml-2 text-xs font-medium text-primary-600">Default</span>
                            )}
                          </p>
                          <p className="text-sm text-gray-500">
                            {method.type === 'bank' ? 'Bank Account' : 'Credit Card'}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Edit
                        </button>
                        {!method.isDefault && (
                          <button
                            type="button"
                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            Set as default
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Tax documents */}
          <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Tax Documents</h3>
              <p className="mt-1 text-sm text-gray-500">Access your tax forms and documents</p>
              <div className="mt-6">
                <div className="rounded-md bg-blue-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <DocumentTextIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Tax Information</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          Your tax documents for the current year will be available in January of next year. Make sure your tax information is up to date.
                        </p>
                      </div>
                      <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                          <button
                            type="button"
                            className="rounded-md bg-blue-50 px-2 py-1.5 text-sm font-medium text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-50"
                          >
                            Update tax information
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}