'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  GlobeAltIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { Disclosure } from '@headlessui/react';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Mock FAQ data
const faqs = [
  {
    category: 'Account & Profile',
    icon: UserGroupIcon,
    questions: [
      {
        question: 'How do I create an account?',
        answer: 'To create an account, click on the "Sign Up" button in the top right corner of the homepage. You can sign up using your email, or through your Google, Twitter, or Metamask accounts.'
      },
      {
        question: 'How do I reset my password?',
        answer: 'To reset your password, click on the "Login" button, then select "Forgot Password". Enter your email address, and we\'ll send you instructions to reset your password.'
      },
      {
        question: 'How do I edit my profile?',
        answer: 'To edit your profile, log in to your account, click on your profile picture in the top right corner, and select "Settings". From there, you can edit your personal information, preferences, and privacy settings.'
      },
      {
        question: 'Can I delete my account?',
        answer: 'Yes, you can delete your account by going to Settings > Account > Delete Account. Please note that this action is permanent and cannot be undone.'
      },
    ]
  },
  {
    category: 'Experiences & Bookings',
    icon: GlobeAltIcon,
    questions: [
      {
        question: 'How do I book an experience?',
        answer: 'To book an experience, browse through our listings or search for specific experiences. Once you find one you like, click on it to view details, then select your preferred date, time, and number of guests. Click "Book Now" to proceed to payment.'
      },
      {
        question: 'Can I cancel my booking?',
        answer: 'Yes, you can cancel your booking by going to your profile and selecting "My Bookings". Find the booking you wish to cancel and click "Cancel Booking". Please note that cancellation policies vary by experience, and refunds are subject to these policies.'
      },
      {
        question: 'How do I leave a review?',
        answer: 'After completing an experience, you\'ll receive an email prompting you to leave a review. Alternatively, you can go to your profile, select "My Experiences", find the completed experience, and click "Leave a Review".'
      },
      {
        question: 'What if an experience doesn\'t meet my expectations?',
        answer: 'If an experience doesn\'t meet your expectations, please contact the host directly through our messaging system. If you can\'t resolve the issue with the host, contact our customer support team, and we\'ll help mediate the situation.'
      },
    ]
  },
  {
    category: 'Payments & Refunds',
    icon: CreditCardIcon,
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept major credit cards (Visa, Mastercard, American Express), PayPal, and various cryptocurrency options through Metamask integration.'
      },
      {
        question: 'How do refunds work?',
        answer: 'Refund policies vary by experience and are set by the hosts. You can find the specific refund policy on each experience\'s page before booking. If you\'re eligible for a refund, it will be processed using your original payment method.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes, we use industry-standard encryption and security measures to protect your payment information. We never store your full credit card details on our servers.'
      },
      {
        question: 'When will I be charged for a booking?',
        answer: 'You\'ll be charged the full amount at the time of booking. For some premium experiences, a deposit may be required at booking, with the remaining balance due closer to the experience date.'
      },
    ]
  },
  {
    category: 'Rewards & Challenges',
    icon: ShieldCheckIcon,
    questions: [
      {
        question: 'How do I earn rewards?',
        answer: 'You can earn rewards by completing experiences, participating in challenges, referring friends, writing reviews, and engaging with the community. Different activities earn different amounts of points or tokens.'
      },
      {
        question: 'What can I do with my rewards?',
        answer: 'Rewards can be redeemed for discounts on future experiences, exclusive access to premium experiences, merchandise, or converted to cryptocurrency tokens on supported platforms.'
      },
      {
        question: 'How do challenges work?',
        answer: 'Challenges are curated sets of experiences that follow a theme or are located in a specific area. Complete all experiences in a challenge to earn bonus rewards, badges, and sometimes unlock special achievements.'
      },
      {
        question: 'Do rewards expire?',
        answer: 'Basic reward points expire after 12 months of inactivity. Premium rewards and tokens have different expiration policies, which are detailed in the Rewards section of your profile.'
      },
    ]
  },
  {
    category: 'Hosting',
    icon: DocumentTextIcon,
    questions: [
      {
        question: 'How do I become a host?',
        answer: 'To become a host, click on "Become a Host" in the navigation menu. You\'ll need to complete your profile, verify your identity, and create your first experience listing. Our team will review your submission before it goes live.'
      },
      {
        question: 'How much does it cost to list an experience?',
        answer: 'Listing an experience is free. We operate on a commission-based model, taking a percentage of each booking. The exact commission rate depends on your host level and the type of experience.'
      },
      {
        question: 'How do I get paid as a host?',
        answer: 'Payments are processed 24 hours after the completion of an experience. You can receive payments via direct deposit, PayPal, or cryptocurrency wallets. You can set up and manage your payment methods in the Host Dashboard.'
      },
      {
        question: 'What support do you provide for hosts?',
        answer: 'We provide hosts with resources including guides, webinars, marketing tools, and dedicated support. Higher-tier hosts also receive personalized coaching, professional photography services, and priority customer support.'
      },
    ]
  },
  {
    category: 'Privacy & Security',
    icon: ChatBubbleLeftRightIcon,
    questions: [
      {
        question: 'How is my personal information protected?',
        answer: 'We use industry-standard security measures to protect your personal information. Our privacy policy details how we collect, use, and protect your data. We never sell your personal information to third parties.'
      },
      {
        question: 'Can I control what information is visible to others?',
        answer: 'Yes, you can control your privacy settings in the Settings > Privacy section of your profile. You can choose what information is visible to the public, to other users, or kept private.'
      },
      {
        question: 'How do you verify hosts and experiences?',
        answer: 'We verify hosts through a combination of ID verification, background checks, and community reviews. Experiences are reviewed by our team before being listed, and we continuously monitor reviews and feedback.'
      },
      {
        question: 'What should I do if I notice suspicious activity?',
        answer: 'If you notice suspicious activity, please report it immediately through the "Report" button on the relevant profile or experience page, or contact our support team directly.'
      },
    ]
  },
];

// Mock contact information
const contactInfo = {
  email: 'support@xhunt.com',
  phone: '+1 (800) 123-4567',
  hours: 'Monday - Friday, 9am - 6pm EST',
  socialMedia: [
    { name: 'Twitter', url: 'https://twitter.com/xhunt' },
    { name: 'Instagram', url: 'https://instagram.com/xhunt' },
    { name: 'Facebook', url: 'https://facebook.com/xhunt' },
    { name: 'Discord', url: 'https://discord.gg/xhunt' },
  ]
};

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Filter FAQs based on search query and active category
  const filteredFaqs = faqs.filter(category => {
    if (activeCategory !== 'All' && category.category !== activeCategory) {
      return false;
    }
    
    if (searchQuery === '') {
      return true;
    }
    
    return category.questions.some(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-10">
        {/* Hero section */}
        <div className="bg-primary-700 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How can we help you?
            </h1>
            <p className="mt-4 text-xl text-primary-100">
              Find answers to common questions or contact our support team
            </p>
            <div className="mt-8 mx-auto max-w-2xl">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Category tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveCategory('All')}
                className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeCategory === 'All' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
              >
                All Categories
              </button>
              {faqs.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setActiveCategory(category.category)}
                  className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeCategory === category.category ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                >
                  {category.category}
                </button>
              ))}
            </nav>
          </div>

          {/* FAQ sections */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* FAQ content */}
            <div className="lg:col-span-2">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((category) => (
                  <div key={category.category} className="mb-12">
                    <div className="flex items-center mb-6">
                      <category.icon className="h-6 w-6 text-primary-600 mr-2" />
                      <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
                    </div>
                    <dl className="space-y-6">
                      {category.questions.map((faq, index) => (
                        <Disclosure as="div" key={index} className="border-b border-gray-200 pb-6">
                          {({ open }) => (
                            <>
                              <dt>
                                <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                  <span className="text-base font-semibold leading-7">{faq.question}</span>
                                  <span className="ml-6 flex h-7 items-center">
                                    {open ? (
                                      <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                      <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </dt>
                              <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </dl>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <QuestionMarkCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              )}
            </div>

            {/* Contact sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 rounded-lg bg-white shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-primary-700 px-6 py-4">
                  <h3 className="text-lg font-medium text-white">Contact Support</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-gray-500 mb-6">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{contactInfo.email}</span>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{contactInfo.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{contactInfo.hours}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full flex items-center justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    >
                      <ChatBubbleLeftRightIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                      Start Live Chat
                    </button>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Connect with us</h4>
                    <div className="flex space-x-4">
                      {contactInfo.socialMedia.map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          className="text-gray-400 hover:text-gray-500"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="sr-only">{social.name}</span>
                          {social.name === 'Twitter' && (
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          )}
                          {social.name === 'Instagram' && (
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                            </svg>
                          )}
                          {social.name === 'Facebook' && (
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                          )}
                          {social.name === 'Discord' && (
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                          )}
                        </a>
                      ))}
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

// Clock icon component
function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}