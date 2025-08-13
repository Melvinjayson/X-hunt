"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface OnboardingStep {
  id: string
  title: string
  description: string
  target?: string
  position?: "top" | "bottom" | "left" | "right"
  action?: () => void
}

interface OnboardingState {
  isActive: boolean
  currentStep: number
  steps: OnboardingStep[]
  userType: "user" | "host" | null
  completedSteps: string[]
  showWelcome: boolean
}

interface OnboardingContextType extends OnboardingState {
  startOnboarding: (userType: "user" | "host") => void
  nextStep: () => void
  prevStep: () => void
  skipOnboarding: () => void
  completeStep: (stepId: string) => void
  setShowWelcome: (show: boolean) => void
  resetOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

const USER_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to X-hunt!",
    description: "Let's get you started on your adventure journey. We'll show you around the platform.",
  },
  {
    id: "search",
    title: "Discover Adventures",
    description: "Use our smart search to find experiences that match your interests and location.",
    target: "[data-onboarding='search']",
    position: "bottom",
  },
  {
    id: "filters",
    title: "Filter & Customize",
    description: "Use filters to narrow down experiences by category, difficulty, price, and more.",
    target: "[data-onboarding='filters']",
    position: "right",
  },
  {
    id: "ai-recommendations",
    title: "AI-Powered Recommendations",
    description: "Get personalized suggestions based on your preferences and booking history.",
    target: "[data-onboarding='recommendations']",
    position: "top",
  },
  {
    id: "booking",
    title: "Easy Booking Process",
    description: "Book experiences with our simple, secure multi-step booking flow.",
    target: "[data-onboarding='book-button']",
    position: "top",
  },
  {
    id: "profile",
    title: "Your Adventure Profile",
    description: "Track your bookings, earn rewards, and manage your adventure preferences.",
    target: "[data-onboarding='profile-menu']",
    position: "bottom",
  },
]

const HOST_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "welcome-host",
    title: "Welcome, Adventure Host!",
    description: "Ready to share amazing experiences? Let's set up your hosting journey.",
  },
  {
    id: "create-experience",
    title: "Create Your First Experience",
    description: "Add your adventure with photos, descriptions, and pricing details.",
    target: "[data-onboarding='create-experience']",
    position: "bottom",
  },
  {
    id: "manage-bookings",
    title: "Manage Bookings",
    description: "Review and approve booking requests from adventurous travelers.",
    target: "[data-onboarding='bookings-tab']",
    position: "right",
  },
  {
    id: "earnings",
    title: "Track Your Earnings",
    description: "Monitor your revenue and see detailed analytics about your experiences.",
    target: "[data-onboarding='earnings-tab']",
    position: "right",
  },
  {
    id: "safety-tools",
    title: "Safety & Quality Tools",
    description: "Use our AI-powered safety assessments and quality management features.",
    target: "[data-onboarding='safety-section']",
    position: "top",
  },
]

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OnboardingState>({
    isActive: false,
    currentStep: 0,
    steps: [],
    userType: null,
    completedSteps: [],
    showWelcome: false,
  })

  useEffect(() => {
    // Check if user has completed onboarding
    const completedSteps = localStorage.getItem("x-hunt-onboarding-completed")
    const hasCompletedOnboarding = localStorage.getItem("x-hunt-onboarding-done")

    if (completedSteps) {
      setState((prev) => ({
        ...prev,
        completedSteps: JSON.parse(completedSteps),
      }))
    }

    // Show welcome for new users
    if (!hasCompletedOnboarding) {
      setState((prev) => ({ ...prev, showWelcome: true }))
    }
  }, [])

  const startOnboarding = (userType: "user" | "host") => {
    const steps = userType === "host" ? HOST_ONBOARDING_STEPS : USER_ONBOARDING_STEPS
    setState((prev) => ({
      ...prev,
      isActive: true,
      currentStep: 0,
      steps,
      userType,
      showWelcome: false,
    }))
  }

  const nextStep = () => {
    setState((prev) => {
      if (prev.currentStep < prev.steps.length - 1) {
        return { ...prev, currentStep: prev.currentStep + 1 }
      } else {
        // Onboarding complete
        localStorage.setItem("x-hunt-onboarding-done", "true")
        return { ...prev, isActive: false, currentStep: 0 }
      }
    })
  }

  const prevStep = () => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1),
    }))
  }

  const skipOnboarding = () => {
    localStorage.setItem("x-hunt-onboarding-done", "true")
    setState((prev) => ({
      ...prev,
      isActive: false,
      showWelcome: false,
      currentStep: 0,
    }))
  }

  const completeStep = (stepId: string) => {
    setState((prev) => {
      const newCompletedSteps = [...prev.completedSteps, stepId]
      localStorage.setItem("x-hunt-onboarding-completed", JSON.stringify(newCompletedSteps))
      return { ...prev, completedSteps: newCompletedSteps }
    })
  }

  const setShowWelcome = (show: boolean) => {
    setState((prev) => ({ ...prev, showWelcome: show }))
  }

  const resetOnboarding = () => {
    localStorage.removeItem("x-hunt-onboarding-done")
    localStorage.removeItem("x-hunt-onboarding-completed")
    setState({
      isActive: false,
      currentStep: 0,
      steps: [],
      userType: null,
      completedSteps: [],
      showWelcome: true,
    })
  }

  return (
    <OnboardingContext.Provider
      value={{
        ...state,
        startOnboarding,
        nextStep,
        prevStep,
        skipOnboarding,
        completeStep,
        setShowWelcome,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}
