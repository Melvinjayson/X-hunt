"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Trophy } from "lucide-react"
import { useOnboarding } from "@/lib/onboarding-context"

const ONBOARDING_MILESTONES = [
  { id: "profile-setup", title: "Complete Profile", points: 50 },
  { id: "first-search", title: "Search Experiences", points: 25 },
  { id: "first-bookmark", title: "Save Favorite", points: 25 },
  { id: "first-booking", title: "Book Experience", points: 100 },
  { id: "first-review", title: "Write Review", points: 75 },
]

export function OnboardingProgress() {
  const { completedSteps } = useOnboarding()

  const completedMilestones = ONBOARDING_MILESTONES.filter((milestone) => completedSteps.includes(milestone.id))

  const totalPoints = completedMilestones.reduce((sum, milestone) => sum + milestone.points, 0)
  const progressPercentage = (completedMilestones.length / ONBOARDING_MILESTONES.length) * 100

  if (completedMilestones.length === 0) return null

  return (
    <Card className="mb-6 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <h3 className="font-semibold text-gray-900">Getting Started Progress</h3>
          </div>
          <Badge variant="secondary">{totalPoints} points earned</Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {completedMilestones.length} of {ONBOARDING_MILESTONES.length} milestones completed
            </span>
            <span className="font-medium text-gray-900">{Math.round(progressPercentage)}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ONBOARDING_MILESTONES.map((milestone) => {
              const isCompleted = completedSteps.includes(milestone.id)
              return (
                <div key={milestone.id} className="flex items-center space-x-2 text-sm">
                  {isCompleted ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-400" />
                  )}
                  <span className={isCompleted ? "text-green-700" : "text-gray-600"}>{milestone.title}</span>
                  <Badge variant="outline" className="text-xs">
                    +{milestone.points}
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
