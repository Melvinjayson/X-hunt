'use client';

import { useState } from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    reason: 'general'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Simulate API call
    try {
      // In a real application, you would send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        reason: 'general'
      });
    } catch (err) {
      setError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-10">
        {/* Hero section */}
        <div className="bg-primary-700 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Get in Touch
            </h1>
            <p className="mt-4 text-xl text-primary-100">
              We're here to help with any questions or feedback you may have
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact information */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                <div className="px-6 py-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <EnvelopeIcon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Email</p>
                        <p className="text-sm text-gray-500">support@xhunt.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <PhoneIcon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Phone</p>
                        <p className="text-sm text-gray-500">+1 (800) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <MapPinIcon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Address</p>
                        <p className="text-sm text-gray-500">
                          123 Experience Way<br />
                          San Francisco, CA 94107<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Hours of Operation</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      <span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM EST
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      <span className="font-medium">Saturday:</span> 10:00 AM - 4:00 PM EST
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Sunday:</span> Closed
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Connect With Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Twitter</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Instagram</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Facebook</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Discord</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                <div className="px-6 py-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Departments</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <QuestionMarkCircleIcon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">General Inquiries</p>
                        <p className="text-sm text-gray-500">info@xhunt.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <ChatBubbleLeftRightIcon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Customer Support</p>
                        <p className="text-sm text-gray-500">support@xhunt.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <UserGroupIcon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Host Support</p>
                        <p className="text-sm text-gray-500">hosts@xhunt.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <CreditCardIcon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Billing</p>
                        <p className="text-sm text-gray-500">billing@xhunt.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <ShieldCheckIcon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Trust & Safety</p>
                        <p className="text-sm text-gray-500">safety@xhunt.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                <div className="px-6 py-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                  
                  {isSubmitted ? (
                    <div className="rounded-md bg-green-50 p-4 mb-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-green-800">Message sent successfully</h3>
                          <div className="mt-2 text-sm text-green-700">
                            <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="firstName"
                              id="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="lastName"
                              id="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <div className="mt-1">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone (optional)
                          </label>
                          <div className="mt-1">
                            <input
                              type="tel"
                              name="phone"
                              id="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                            Reason for contact
                          </label>
                          <div className="mt-1">
                            <select
                              id="reason"
                              name="reason"
                              value={formData.reason}
                              onChange={handleChange}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            >
                              <option value="general">General Inquiry</option>
                              <option value="support">Customer Support</option>
                              <option value="host">Host Support</option>
                              <option value="billing">Billing Question</option>
                              <option value="feedback">Feedback</option>
                              <option value="partnership">Partnership Opportunity</option>
                              <option value="press">Press Inquiry</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                            Subject
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="subject"
                              id="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            Message
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="message"
                              name="message"
                              rows={6}
                              value={formData.message}
                              onChange={handleChange}
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {error && (
                        <div className="rounded-md bg-red-50 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-red-800">Error</h3>
                              <div className="mt-2 text-sm text-red-700">
                                <p>{error}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
              
              {/* FAQ section */}
              <div className="mt-8 bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                <div className="px-6 py-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                  
                  <dl className="space-y-6 divide-y divide-gray-200">
                    <div className="pt-6">
                      <dt className="text-lg">
                        <span className="font-medium text-gray-900">How quickly can I expect a response?</span>
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">
                        We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please call our customer support line.
                      </dd>
                    </div>
                    
                    <div className="pt-6">
                      <dt className="text-lg">
                        <span className="font-medium text-gray-900">I'm having trouble with a booking. What should I do?</span>
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">
                        For booking-related issues, please contact our customer support team directly at support@xhunt.com with your booking reference number.
                      </dd>
                    </div>
                    
                    <div className="pt-6">
                      <dt className="text-lg">
                        <span className="font-medium text-gray-900">How do I become a host on X-hunt?</span>
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">
                        To become a host, click on "Become a Host" in the navigation menu and follow the instructions. If you have specific questions, email hosts@xhunt.com.
                      </dd>
                    </div>
                    
                    <div className="pt-6">
                      <dt className="text-lg">
                        <span className="font-medium text-gray-900">Where can I find more help resources?</span>
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">
                        Visit our <a href="/help" className="text-primary-600 hover:text-primary-500">Help Center</a> for comprehensive guides, tutorials, and answers to common questions.
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Location</h2>
            <div className="h-96 bg-gray-300 rounded-lg overflow-hidden">
              {/* In a real application, you would integrate with Google Maps or another mapping service */}
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <MapPinIcon className="h-12 w-12 text-primary-600" />
                <span className="ml-2 text-lg font-medium text-gray-700">123 Experience Way, San Francisco, CA 94107</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
