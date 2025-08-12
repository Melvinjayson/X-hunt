'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  CheckCircleIcon,
  CloudArrowUpIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  ClockIcon,
  TagIcon,
  UserGroupIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function CreateExperiencePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    address: '',
    duration: '',
    groupSize: '',
    price: '',
    currency: 'USD',
    images: [] as File[],
    included: [''],
    notIncluded: [''],
    requirements: [''],
    cancellationPolicy: 'moderate',
    rewardType: 'xp',
    rewardValue: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'food', name: 'Food & Dining', icon: '🍽️' },
    { id: 'outdoor', name: 'Outdoor Adventures', icon: '🏞️' },
    { id: 'art', name: 'Art & Culture', icon: '🎨' },
    { id: 'music', name: 'Music & Concerts', icon: '🎵' },
    { id: 'sports', name: 'Sports & Fitness', icon: '🏃‍♂️' },
    { id: 'tech', name: 'Technology', icon: '💻' },
    { id: 'wellness', name: 'Wellness & Spa', icon: '💆‍♀️' },
    { id: 'nightlife', name: 'Nightlife', icon: '🌃' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️' },
    { id: 'history', name: 'History & Heritage', icon: '🏛️' },
    { id: 'photography', name: 'Photography', icon: '📸' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
  ];

  const durations = [
    '30 minutes',
    '1 hour',
    '1.5 hours',
    '2 hours',
    '2.5 hours',
    '3 hours',
    '3.5 hours',
    '4 hours',
    '5 hours',
    '6 hours',
    '7 hours',
    '8 hours',
    'Full day',
    'Multi-day',
  ];

  const groupSizes = [
    '1-2 people',
    '1-4 people',
    '1-6 people',
    '1-8 people',
    '1-10 people',
    '1-15 people',
    '1-20 people',
    '10+ people',
    '20+ people',
  ];

  const cancellationPolicies = [
    { id: 'flexible', name: 'Flexible', description: 'Full refund up to 24 hours before the experience' },
    { id: 'moderate', name: 'Moderate', description: 'Full refund up to 5 days before the experience' },
    { id: 'strict', name: 'Strict', description: 'Full refund up to 7 days before the experience' },
  ];

  const rewardTypes = [
    { id: 'xp', name: 'XP Points', description: 'Reward participants with experience points' },
    { id: 'badge', name: 'Badge', description: 'Award a unique badge for completing this experience' },
    { id: 'token', name: 'Tokens', description: 'Distribute digital tokens that can be redeemed for rewards' },
    { id: 'nft', name: 'NFT', description: 'Mint a unique digital collectible for participants' },
  ];

  const steps = [
    { name: 'Basics', description: 'Title, description, and category' },
    { name: 'Details', description: 'Location, duration, and group size' },
    { name: 'Pricing', description: 'Set your price and currency' },
    { name: 'Photos', description: 'Upload photos of your experience' },
    { name: 'Inclusions', description: 'What is included and requirements' },
    { name: 'Policies', description: 'Cancellation policy and rewards' },
    { name: 'Review', description: 'Review and publish' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleArrayInputChange = (index: number, field: 'included' | 'notIncluded' | 'requirements', value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'included' | 'notIncluded' | 'requirements') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (index: number, field: 'included' | 'notIncluded' | 'requirements') => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setFormData({ ...formData, images: [...formData.images, ...newImages] });
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    switch (currentStep) {
      case 0: // Basics
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.category) newErrors.category = 'Category is required';
        break;
      case 1: // Details
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.duration) newErrors.duration = 'Duration is required';
        if (!formData.groupSize) newErrors.groupSize = 'Group size is required';
        break;
      case 2: // Pricing
        if (!formData.price.trim()) {
          newErrors.price = 'Price is required';
        } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
          newErrors.price = 'Price must be a positive number';
        }
        break;
      case 3: // Photos
        if (formData.images.length === 0) newErrors.images = 'At least one image is required';
        break;
      case 4: // Inclusions
        if (formData.included.some(item => !item.trim())) {
          newErrors.included = 'All included items must have a value';
        }
        if (formData.notIncluded.some(item => !item.trim())) {
          newErrors.notIncluded = 'All not included items must have a value';
        }
        if (formData.requirements.some(item => !item.trim())) {
          newErrors.requirements = 'All requirements must have a value';
        }
        break;
      case 5: // Policies
        if (!formData.rewardValue.trim()) {
          newErrors.rewardValue = 'Reward value is required';
        } else if (isNaN(Number(formData.rewardValue)) || Number(formData.rewardValue) <= 0) {
          newErrors.rewardValue = 'Reward value must be a positive number';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to create the experience
      // For now, we'll just simulate a successful creation after a short delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to the host dashboard after successful creation
      router.push('/host/dashboard');
    } catch (error) {
      console.error('Error creating experience:', error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
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
                Create a New Experience
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Share your unique activity with the world and start earning
              </p>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
              <Link
                href="/host/dashboard"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Link>
            </div>
          </div>

          {/* Progress steps */}
          <nav aria-label="Progress" className="mb-8">
            <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
              {steps.map((step, index) => (
                <li key={step.name} className="md:flex-1">
                  <div
                    className={`group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 ${index < currentStep ? 'border-primary-600 md:hover:border-primary-800' : index === currentStep ? 'border-primary-600' : 'border-gray-200'}`}
                  >
                    <span className={`text-sm font-medium ${index < currentStep ? 'text-primary-600 group-hover:text-primary-800' : index === currentStep ? 'text-primary-600' : 'text-gray-500'}`}>
                      Step {index + 1}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          {/* Form */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Basics */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Basic Information</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">Provide the essential details about your experience.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                          Title
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.title ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-primary-600'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            placeholder="e.g., Urban Street Art Tour"
                          />
                        </div>
                        {errors.title && (
                          <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                        )}
                        <p className="mt-2 text-sm text-gray-500">Choose a catchy, descriptive title that clearly conveys what participants will experience.</p>
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                          Description
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="description"
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleInputChange}
                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.description ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-primary-600'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            placeholder="Describe your experience in detail..."
                          />
                        </div>
                        {errors.description && (
                          <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                        )}
                        <p className="mt-2 text-sm text-gray-500">Provide a detailed description of what participants will do, see, and learn during your experience.</p>
                      </div>

                      <div>
                        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                          Category
                        </label>
                        <div className="mt-2">
                          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {categories.map((category) => (
                              <div
                                key={category.id}
                                onClick={() => setFormData({ ...formData, category: category.id })}
                                className={`cursor-pointer rounded-lg border p-4 ${formData.category === category.id ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
                              >
                                <div className="flex flex-col items-center justify-center">
                                  <span className="text-2xl">{category.icon}</span>
                                  <span className="mt-2 text-sm font-medium">{category.name}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {errors.category && (
                          <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Experience Details</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">Provide specific details about your experience.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                          Location
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="location"
                            id="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.location ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-primary-600'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            placeholder="e.g., Brooklyn, NY"
                          />
                        </div>
                        {errors.location && (
                          <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                          Meeting Address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="address"
                            id="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.address ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-primary-600'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            placeholder="e.g., 123 Main St, Brooklyn, NY 11201"
                          />
                        </div>
                        {errors.address && (
                          <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                        )}
                        <p className="mt-2 text-sm text-gray-500">This will only be shared with confirmed participants.</p>
                      </div>

                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="duration" className="block text-sm font-medium leading-6 text-gray-900">
                            Duration
                          </label>
                          <div className="mt-2">
                            <select
                              id="duration"
                              name="duration"
                              value={formData.duration}
                              onChange={handleInputChange}
                              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.duration ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-primary-600'} focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            >
                              <option value="">Select duration</option>
                              {durations.map((duration) => (
                                <option key={duration} value={duration}>
                                  {duration}
                                </option>
                              ))}
                            </select>
                          </div>
                          {errors.duration && (
                            <p className="mt-2 text-sm text-red-600">{errors.duration}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="groupSize" className="block text-sm font-medium leading-6 text-gray-900">
                            Group Size
                          </label>
                          <div className="mt-2">
                            <select
                              id="groupSize"
                              name="groupSize"
                              value={formData.groupSize}
                              onChange={handleInputChange}
                              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.groupSize ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-primary-600'} focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            >
                              <option value="">Select group size</option>
                              {groupSizes.map((size) => (
                                <option key={size} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                          </div>
                          {errors.groupSize && (
                            <p className="mt-2 text-sm text-red-600">{errors.groupSize}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Pricing */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Pricing</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">Set the price for your experience.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                            Price per person
                          </label>
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="text"
                              name="price"
                              id="price"
                              value={formData.price}
                              onChange={handleInputChange}
                              className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ${errors.price ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-primary-600'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                              placeholder="0.00"
                              aria-describedby="price-currency"
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                              <span className="text-gray-500 sm:text-sm" id="price-currency">
                                {formData.currency}
                              </span>
                            </div>
                          </div>
                          {errors.price && (
                            <p className="mt-2 text-sm text-red-600">{errors.price}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="currency" className="block text-sm font-medium leading-6 text-gray-900">
                            Currency
                          </label>
                          <div className="mt-2">
                            <select
                              id="currency"
                              name="currency"
                              value={formData.currency}
                              onChange={handleInputChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            >
                              <option value="USD">USD - US Dollar</option>
                              <option value="EUR">EUR - Euro</option>
                              <option value="GBP">GBP - British Pound</option>
                              <option value="CAD">CAD - Canadian Dollar</option>
                              <option value="AUD">AUD - Australian Dollar</option>
                              <option value="JPY">JPY - Japanese Yen</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md bg-blue-50 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3 flex-1 md:flex md:justify-between">
                            <p className="text-sm text-blue-700">X-Hunt charges a 15% service fee on all bookings. Set your price accordingly to ensure you receive your desired amount.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Photos */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Photos</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">Upload high-quality photos that showcase your experience.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Experience Photos
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500"
                              >
                                <span>Upload files</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  multiple
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                        {errors.images && (
                          <p className="mt-2 text-sm text-red-600">{errors.images}</p>
                        )}
                      </div>

                      {formData.images.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Uploaded Photos</h3>
                          <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {formData.images.map((image, index) => (
                              <div key={index} className="relative">
                                <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100">
                                  <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Uploaded image ${index + 1}`}
                                    className="pointer-events-none object-cover group-hover:opacity-75"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 rounded-full bg-red-600 p-1 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                  >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                                  {image.name}
                                </p>
                                <p className="pointer-events-none block text-sm font-medium text-gray-500">
                                  {(image.size / 1024).toFixed(2)} KB
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 5: Inclusions */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Inclusions & Requirements</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">Specify what's included, not included, and any requirements for participants.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          What's included
                        </label>
                        <p className="mt-1 text-sm text-gray-500">List items that are included in the price (e.g., equipment, food, transportation).</p>
                        
                        {formData.included.map((item, index) => (
                          <div key={`included-${index}`} className="mt-2 flex">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => handleArrayInputChange(index, 'included', e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                              placeholder="e.g., All art supplies"
                            />
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => removeArrayItem(index, 'included')}
                                className="ml-2 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        
                        <button
                          type="button"
                          onClick={() => addArrayItem('included')}
                          className="mt-2 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Add Item
                        </button>
                        
                        {errors.included && (
                          <p className="mt-2 text-sm text-red-600">{errors.included}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          What's not included
                        </label>
                        <p className="mt-1 text-sm text-gray-500">List items that participants need to bring or pay for separately.</p>
                        
                        {formData.notIncluded.map((item, index) => (
                          <div key={`notIncluded-${index}`} className="mt-2 flex">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => handleArrayInputChange(index, 'notIncluded', e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                              placeholder="e.g., Transportation to meeting point"
                            />
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => removeArrayItem(index, 'notIncluded')}
                                className="ml-2 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        
                        <button
                          type="button"
                          onClick={() => addArrayItem('notIncluded')}
                          className="mt-2 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Add Item
                        </button>
                        
                        {errors.notIncluded && (
                          <p className="mt-2 text-sm text-red-600">{errors.notIncluded}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Requirements
                        </label>
                        <p className="mt-1 text-sm text-gray-500">List any requirements or prerequisites for participants (e.g., age, skill level, physical condition).</p>
                        
                        {formData.requirements.map((item, index) => (
                          <div key={`requirements-${index}`} className="mt-2 flex">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => handleArrayInputChange(index, 'requirements', e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                              placeholder="e.g., Must be 18+ years old"
                            />
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => removeArrayItem(index, 'requirements')}
                                className="ml-2 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        
                        <button
                          type="button"
                          onClick={() => addArrayItem('requirements')}
                          className="mt-2 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Add Requirement
                        </button>
                        
                        {errors.requirements && (
                          <p className="mt-2 text-sm text-red-600">{errors.requirements}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Policies */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Policies & Rewards</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">Set your cancellation policy and reward structure.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Cancellation Policy
                        </label>
                        <div className="mt-2 space-y-4">
                          {cancellationPolicies.map((policy) => (
                            <div key={policy.id} className="relative flex items-start">
                              <div className="flex h-6 items-center">
                                <input
                                  id={`policy-${policy.id}`}
                                  name="cancellationPolicy"
                                  type="radio"
                                  checked={formData.cancellationPolicy === policy.id}
                                  onChange={() => setFormData({ ...formData, cancellationPolicy: policy.id })}
                                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
                                />
                              </div>
                              <div className="ml-3 text-sm leading-6">
                                <label htmlFor={`policy-${policy.id}`} className="font-medium text-gray-900">
                                  {policy.name}
                                </label>
                                <p className="text-gray-500">{policy.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Reward Type
                        </label>
                        <div className="mt-2 space-y-4">
                          {rewardTypes.map((reward) => (
                            <div key={reward.id} className="relative flex items-start">
                              <div className="flex h-6 items-center">
                                <input
                                  id={`reward-${reward.id}`}
                                  name="rewardType"
                                  type="radio"
                                  checked={formData.rewardType === reward.id}
                                  onChange={() => setFormData({ ...formData, rewardType: reward.id })}
                                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
                                />
                              </div>
                              <div className="ml-3 text-sm leading-6">
                                <label htmlFor={`reward-${reward.id}`} className="font-medium text-gray-900">
                                  {reward.name}
                                </label>
                                <p className="text-gray-500">{reward.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="rewardValue" className="block text-sm font-medium leading-6 text-gray-900">
                          Reward Value
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="rewardValue"
                            id="rewardValue"
                            value={formData.rewardValue}
                            onChange={handleInputChange}
                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.rewardValue ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-primary-600'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                            placeholder="e.g., 100"
                          />
                        </div>
                        {errors.rewardValue && (
                          <p className="mt-2 text-sm text-red-600">{errors.rewardValue}</p>
                        )}
                        <p className="mt-2 text-sm text-gray-500">
                          {formData.rewardType === 'xp' && 'Number of XP points participants will earn'}
                          {formData.rewardType === 'badge' && 'Badge level (1-5)'}
                          {formData.rewardType === 'token' && 'Number of tokens participants will earn'}
                          {formData.rewardType === 'nft' && 'Rarity level (1-5)'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 7: Review */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Review Your Experience</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">Review all details before publishing your experience.</p>
                    </div>

                    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                      <div className="px-4 py-6 sm:px-6">
                        <h3 className="text-lg font-medium leading-7 text-gray-900">{formData.title || 'Untitled Experience'}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{formData.description.substring(0, 150)}...</p>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500">Category</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {categories.find(c => c.id === formData.category)?.name || 'Not specified'}
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500">Location</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {formData.location || 'Not specified'}
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500">Duration</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {formData.duration || 'Not specified'}
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500">Group Size</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {formData.groupSize || 'Not specified'}
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500">Price</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {formData.price ? `${formData.price} ${formData.currency} per person` : 'Not specified'}
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500">Photos</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {formData.images.length} photos uploaded
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500">Reward</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {rewardTypes.find(r => r.id === formData.rewardType)?.name}: {formData.rewardValue || 'Not specified'}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="rounded-md bg-yellow-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <ExclamationCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">Attention</h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <p>
                              By publishing this experience, you agree to X-Hunt's Terms of Service and Host Guidelines. Your experience will be reviewed by our team before it becomes publicly available.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="mt-8 flex justify-between">
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <ArrowLeftIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    >
                      Next
                      <ArrowRightIcon className="ml-1.5 -mr-0.5 h-5 w-5" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        'Publishing...'
                      ) : (
                        <>
                          Publish Experience
                          <CheckCircleIcon className="ml-1.5 -mr-0.5 h-5 w-5" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}