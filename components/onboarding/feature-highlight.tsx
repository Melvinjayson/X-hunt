"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, X, ArrowRight } from "lucide-react"
import { useOnboarding } from "@/lib/onboarding-context"

interface FeatureHighlightProps {
  featureId: string
  title: string
  description: string
  benefits: string[]
  ctaText?: string
  ctaAction?: () => void
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left"
  delay?: number
}

export function FeatureHighlight({
  featureId,
  title,
  description,
  benefits,
  ctaText = "Try it now",
  ctaAction,
  position = "bottom-right",
  delay = 2000,
}: FeatureHighlightProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const { completedSteps, completeStep } = useOnboarding()

  useEffect(() => {
    // Check if feature has been highlighted before
    const dismissed = localStorage.getItem(`x-hunt-feature-${featureId}-dismissed`)
    const completed = completedSteps.includes(featureId)

    if (dismissed || completed) {
      setIsDismissed(true)
      return
    }

    // Show highlight after delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [featureId, delay, completedSteps])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem(`x-hunt-feature-${featureId}-dismissed`, "true")
  }

  const handleCTA = () => {
    completeStep(featureId)
    setIsVisible(false)
    if (ctaAction) {
      ctaAction()
    }
  }

  if (isDismissed || !isVisible) return null

  const positionClasses = {
    "top-right": "top-4 right-4",
    "bottom-right": "bottom-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-left": "bottom-4 left-4",
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-40 max-w-sm animate-in slide-in-from-right-5`}>
      <Card className="shadow-lg border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-blue-600" />
              </div>
              <Badge variant="secondary" className="text-xs">
                New Feature
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={handleDismiss} className="p-1">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>

          <ul className="space-y-1 mb-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start text-xs text-gray-600">
                <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-2">
            <Button size="sm" onClick={handleCTA} className="flex-1">
              {ctaText}
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDismiss}>
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
