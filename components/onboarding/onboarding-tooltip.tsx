"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, X, Target } from "lucide-react"
import { useOnboarding } from "@/lib/onboarding-context"

export function OnboardingTooltip() {
  const { isActive, currentStep, steps, nextStep, prevStep, skipOnboarding } = useOnboarding()
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const currentStepData = steps[currentStep]

  useEffect(() => {
    if (!isActive || !currentStepData?.target) {
      setIsVisible(false)
      return
    }

    const updatePosition = () => {
      const targetElement = document.querySelector(currentStepData.target!)
      if (!targetElement || !tooltipRef.current) return

      const targetRect = targetElement.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const scrollY = window.scrollY
      const scrollX = window.scrollX

      let top = 0
      let left = 0

      switch (currentStepData.position) {
        case "top":
          top = targetRect.top + scrollY - tooltipRect.height - 16
          left = targetRect.left + scrollX + targetRect.width / 2 - tooltipRect.width / 2
          break
        case "bottom":
          top = targetRect.bottom + scrollY + 16
          left = targetRect.left + scrollX + targetRect.width / 2 - tooltipRect.width / 2
          break
        case "left":
          top = targetRect.top + scrollY + targetRect.height / 2 - tooltipRect.height / 2
          left = targetRect.left + scrollX - tooltipRect.width - 16
          break
        case "right":
          top = targetRect.top + scrollY + targetRect.height / 2 - tooltipRect.height / 2
          left = targetRect.right + scrollX + 16
          break
        default:
          top = targetRect.bottom + scrollY + 16
          left = targetRect.left + scrollX
      }

      // Keep tooltip within viewport
      const maxLeft = window.innerWidth - tooltipRect.width - 16
      const maxTop = window.innerHeight + scrollY - tooltipRect.height - 16

      left = Math.max(16, Math.min(left, maxLeft))
      top = Math.max(scrollY + 16, Math.min(top, maxTop))

      setPosition({ top, left })
      setIsVisible(true)

      // Highlight target element
      targetElement.classList.add("onboarding-highlight")
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(updatePosition, 100)

    // Update position on scroll/resize
    window.addEventListener("scroll", updatePosition)
    window.addEventListener("resize", updatePosition)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", updatePosition)
      window.removeEventListener("resize", updatePosition)

      // Remove highlight from all elements
      document.querySelectorAll(".onboarding-highlight").forEach((el) => {
        el.classList.remove("onboarding-highlight")
      })
    }
  }, [isActive, currentStep, currentStepData])

  if (!isActive || !currentStepData) return null

  // Show modal-style tooltip for steps without targets
  if (!currentStepData.target) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{currentStepData.title}</h3>
            <p className="text-gray-600">{currentStepData.description}</p>
            <div className="flex items-center justify-between pt-4">
              <Button variant="ghost" onClick={skipOnboarding}>
                Skip Tour
              </Button>
              <div className="flex items-center space-x-2">
                {currentStep > 0 && (
                  <Button variant="outline" size="sm" onClick={prevStep}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                )}
                <Button onClick={nextStep}>
                  {currentStep === steps.length - 1 ? "Finish" : "Next"}
                  {currentStep < steps.length - 1 && <ArrowRight className="h-4 w-4 ml-1" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 z-40" />

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className={`fixed z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ top: position.top, left: position.left }}
      >
        <Card className="max-w-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{currentStepData.title}</h3>
                <p className="text-sm text-gray-600">{currentStepData.description}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={skipOnboarding} className="ml-2 p-1">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep ? "bg-blue-500" : index < currentStep ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center space-x-2">
                {currentStep > 0 && (
                  <Button variant="outline" size="sm" onClick={prevStep}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                <Button size="sm" onClick={nextStep}>
                  {currentStep === steps.length - 1 ? "Finish" : "Next"}
                  {currentStep < steps.length - 1 && <ArrowRight className="h-4 w-4 ml-1" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
