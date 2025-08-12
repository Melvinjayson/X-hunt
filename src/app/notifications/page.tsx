'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { 
  BellIcon, 
  BellSlashIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  GiftIcon,
  CalendarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChevronRightIcon,
  TrashIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function NotificationsPage() {
  // Mock data for notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      type: 'booking_confirmation',
      title: 'Booking Confirmed',
      message: 'Your booking for "Urban Street Art Tour" on November 5th has been confirmed.',
      date: '2023-10-20T14:32:00',
      read: false,
      icon: CheckCircleIcon,
      iconBackground: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      id: 'n2',
      type: 'reward',
      title: 'New Reward Available',
      message: 'You have earned a 20% discount on your next booking! Valid until December 31st.',
      date: '2023-10-19T09:15:00',
      read: false,
      icon: GiftIcon,
      iconBackground: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      id: 'n3',
      type: 'reminder',
      title: 'Upcoming Experience',
      message: 'Do not forget your Hidden Waterfall Hike experience tomorrow at 9:00 AM. Weather forecast: Sunny, 72 degrees F.',
      date: '2023-10-18T16:45:00',
      read: true,
      icon: CalendarIcon,
      iconBackground: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 'n4',
      type: 'social',
      title: 'New Friend Request',
      message: 'Alex Chen wants to connect with you on X-Hunt.',
      date: '2023-10-17T11:20:00',
      read: true,
      icon: UserGroupIcon,
      iconBackground: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
    },
    {
      id: 'n5',
      type: 'points',
      title: 'Points Earned',
      message: 'You earned 150 points for completing "Urban Street Art Tour".',
      date: '2023-10-15T13:10:00',
      read: true,
      icon: CurrencyDollarIcon,
      iconBackground: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
    {
      id: 'n6',
      type: 'system',
      title: 'App Update Available',
      message: 'A new version of X-Hunt is available with exciting new features.',
      date: '2023-10-12T08:30:00',
      read: true,
      icon: InformationCircleIcon,
      iconBackground: 'bg-gray-100',
      iconColor: 'text-gray-600',
    },
    {
      id: 'n7',
      type: 'booking_change',
      title: 'Booking Time Changed',
      message: 'The time for your "Rooftop Yoga & Meditation" experience has changed from 5:00 PM to 6:00 PM.',
      date: '2023-10-10T15:25:00',
      read: true,
      icon: ExclamationCircleIcon,
      iconBackground: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
  ]);

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      bookingConfirmations: true,
      reminders: true,
      rewards: true,
      pointsUpdates: true,
      friendActivity: false,
      marketingPromotions: false,
    },
    push: {
      bookingConfirmations: true,
      reminders: true,
      rewards: true,
      pointsUpdates: true,
      friendActivity: true,
      marketingPromotions: false,
    },
    sms: {
      bookingConfirmations: true,
      reminders: true,
      rewards: false,
      pointsUpdates: false,
      friendActivity: false,
      marketingPromotions: false,
    },
  });

  // Format date to relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true,
    })));
  };

  // Mark a single notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Toggle notification setting
  const toggleNotificationSetting = (channel: 'email' | 'push' | 'sms', setting: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [channel]: {
        ...notificationSettings[channel],
        [setting]: !notificationSettings[channel][setting as keyof typeof notificationSettings[typeof channel]],
      },
    });
  };

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-8 md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Notifications
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Stay updated on your bookings, rewards, and activity
              </p>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
              <button
                type="button"
                onClick={markAllAsRead}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                disabled={unreadCount === 0}
              >
                <CheckCircleIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                Mark all as read
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Notifications list */}
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Recent Notifications
                    {unreadCount > 0 && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700">
                        {unreadCount} unread
                      </span>
                    )}
                  </h3>
                  <div className="mt-6 flow-root">
                    <ul role="list" className="-my-5 divide-y divide-gray-200">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <li 
                            key={notification.id} 
                            className={classNames(
                              'py-5 px-4 hover:bg-gray-50',
                              !notification.read ? 'bg-primary-50' : ''
                            )}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start">
                              <div className={classNames(
                                'flex-shrink-0 rounded-full p-2',
                                notification.iconBackground
                              )}>
                                <notification.icon className={classNames(
                                  'h-5 w-5',
                                  notification.iconColor
                                )} aria-hidden="true" />
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                  <div className="flex">
                                    <p className="text-sm text-gray-500">{formatRelativeTime(notification.date)}</p>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteNotification(notification.id);
                                      }}
                                      className="ml-2 text-gray-400 hover:text-gray-500"
                                    >
                                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                  </div>
                                </div>
                                <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                                {!notification.read && (
                                  <div className="mt-2">
                                    <button
                                      type="button"
                                      className="text-sm font-medium text-primary-600 hover:text-primary-500"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        markAsRead(notification.id);
                                      }}
                                    >
                                      Mark as read
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="py-10 text-center">
                          <BellSlashIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                          <h3 className="mt-2 text-sm font-semibold text-gray-900">No notifications</h3>
                          <p className="mt-1 text-sm text-gray-500">You don't have any notifications at the moment.</p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification settings */}
            <div className="lg:col-span-1">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">Notification Settings</h3>
                  <p className="mt-1 text-sm text-gray-500">Customize how you receive notifications</p>
                  
                  <div className="mt-6">
                    <div className="space-y-6">
                      {/* Email notifications */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 flex items-center">
                          <EnvelopeIcon className="mr-2 h-5 w-5 text-gray-400" />
                          Email Notifications
                        </h4>
                        <div className="mt-4 space-y-4">
                          {Object.entries(notificationSettings.email).map(([key, enabled]) => (
                            <Switch.Group as="div" className="flex items-center justify-between" key={key}>
                              <Switch.Label as="span" className="flex-grow flex flex-col" passive>
                                <span className="text-sm font-medium text-gray-900">
                                  {key === 'bookingConfirmations' ? 'Booking Confirmations' :
                                   key === 'reminders' ? 'Reminders' :
                                   key === 'rewards' ? 'Rewards' :
                                   key === 'pointsUpdates' ? 'Points Updates' :
                                   key === 'friendActivity' ? 'Friend Activity' :
                                   key === 'marketingPromotions' ? 'Marketing & Promotions' : key}
                                </span>
                              </Switch.Label>
                              <Switch
                                checked={enabled}
                                onChange={() => toggleNotificationSetting('email', key)}
                                className={classNames(
                                  enabled ? 'bg-primary-600' : 'bg-gray-200',
                                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                                )}
                              >
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    enabled ? 'translate-x-5' : 'translate-x-0',
                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                  )}
                                />
                              </Switch>
                            </Switch.Group>
                          ))}
                        </div>
                      </div>

                      {/* Push notifications */}
                      <div className="pt-6 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 flex items-center">
                          <DevicePhoneMobileIcon className="mr-2 h-5 w-5 text-gray-400" />
                          Push Notifications
                        </h4>
                        <div className="mt-4 space-y-4">
                          {Object.entries(notificationSettings.push).map(([key, enabled]) => (
                            <Switch.Group as="div" className="flex items-center justify-between" key={key}>
                              <Switch.Label as="span" className="flex-grow flex flex-col" passive>
                                <span className="text-sm font-medium text-gray-900">
                                  {key === 'bookingConfirmations' ? 'Booking Confirmations' :
                                   key === 'reminders' ? 'Reminders' :
                                   key === 'rewards' ? 'Rewards' :
                                   key === 'pointsUpdates' ? 'Points Updates' :
                                   key === 'friendActivity' ? 'Friend Activity' :
                                   key === 'marketingPromotions' ? 'Marketing & Promotions' : key}
                                </span>
                              </Switch.Label>
                              <Switch
                                checked={enabled}
                                onChange={() => toggleNotificationSetting('push', key)}
                                className={classNames(
                                  enabled ? 'bg-primary-600' : 'bg-gray-200',
                                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                                )}
                              >
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    enabled ? 'translate-x-5' : 'translate-x-0',
                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                  )}
                                />
                              </Switch>
                            </Switch.Group>
                          ))}
                        </div>
                      </div>

                      {/* SMS notifications */}
                      <div className="pt-6 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 flex items-center">
                          <ChatBubbleLeftRightIcon className="mr-2 h-5 w-5 text-gray-400" />
                          SMS Notifications
                        </h4>
                        <div className="mt-4 space-y-4">
                          {Object.entries(notificationSettings.sms).map(([key, enabled]) => (
                            <Switch.Group as="div" className="flex items-center justify-between" key={key}>
                              <Switch.Label as="span" className="flex-grow flex flex-col" passive>
                                <span className="text-sm font-medium text-gray-900">
                                  {key === 'bookingConfirmations' ? 'Booking Confirmations' :
                                   key === 'reminders' ? 'Reminders' :
                                   key === 'rewards' ? 'Rewards' :
                                   key === 'pointsUpdates' ? 'Points Updates' :
                                   key === 'friendActivity' ? 'Friend Activity' :
                                   key === 'marketingPromotions' ? 'Marketing & Promotions' : key}
                                </span>
                              </Switch.Label>
                              <Switch
                                checked={enabled}
                                onChange={() => toggleNotificationSetting('sms', key)}
                                className={classNames(
                                  enabled ? 'bg-primary-600' : 'bg-gray-200',
                                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                                )}
                              >
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    enabled ? 'translate-x-5' : 'translate-x-0',
                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                  )}
                                />
                              </Switch>
                            </Switch.Group>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <button
                        type="button"
                        className="w-full rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                      >
                        Save Settings
                      </button>
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