"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info, ThumbsUp, ThumbsDown, Settings } from "lucide-react"
import { recommendationEngine, type AIRecommendation } from "@/lib/ai-services"
import { mockExperiences } from "@/lib/mock-data"

interface AIRecommendationsProps {
  userId: string
  className?: string
}

export function AIRecommendations({ userId, className }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [userConsent, setUserConsent] = useState(false)
  const [showExplanation, setShowExplanation] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecommendations()
  }, [userId, userConsent])

  const loadRecommendations = async () => {
    setLoading(true)
    try {
      const recs = await recommendationEngine.getPersonalizedRecommendations(userId, userConsent, 6)
      setRecommendations(recs)
    } catch (error) {
      console.error("Failed to load recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFeedback = async (experienceId: string, helpful: boolean) => {
    await recommendationEngine.provideFeedback(userId, experienceId, helpful)
    // Show feedback confirmation
  }

  const getExperience = (id: string) => mockExperiences.find((exp) => exp.id === id)

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI-Powered Recommendations</h2>
          <p className="text-gray-600">Personalized suggestions based on your preferences</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setUserConsent(!userConsent)}>
          <Settings className="h-4 w-4 mr-2" />
          {userConsent ? "Personalized" : "General"}
        </Button>
      </div>

      {!userConsent && (
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">Enable Personalized Recommendations?</h3>
                <p className="text-blue-700 text-sm mt-1">
                  We can provide better recommendations using your booking history and preferences. Your data is
                  processed ethically and you maintain full control.
                </p>
                <Button size="sm" className="mt-3" onClick={() => setUserConsent(true)}>
                  Enable Personalization
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((rec) => {
          const experience = getExperience(rec.experienceId)
          if (!experience) return null

          return (
            <Card key={rec.experienceId} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{experience.title}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {Math.round(rec.score * 100)}% match
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowExplanation(showExplanation === rec.experienceId ? null : rec.experienceId)}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={experience.images[0] || "/placeholder.svg"}
                    alt={experience.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{experience.location}</span>
                  <span>${experience.price}</span>
                </div>

                {showExplanation === rec.experienceId && (
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <h4 className="font-semibold text-sm">Why we recommend this:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {rec.reasoning.map((reason, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-blue-600 mt-2 pt-2 border-t border-gray-200">{rec.transparencyNote}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <Button size="sm" className="flex-1 mr-2">
                    View Details
                  </Button>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleFeedback(rec.experienceId, true)}>
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleFeedback(rec.experienceId, false)}>
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">About Our AI Recommendations</h3>
        <p className="text-sm text-gray-600 mb-3">
          Our AI system uses ethical algorithms to suggest experiences you might enjoy. We prioritize transparency,
          fairness, and your privacy in all recommendations.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Bias-Free</Badge>
          <Badge variant="outline">Privacy-Preserving</Badge>
          <Badge variant="outline">Transparent</Badge>
          <Badge variant="outline">User-Controlled</Badge>
        </div>
      </div>
    </div>
  )
}
