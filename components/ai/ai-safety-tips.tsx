"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { safetyAssessor, type AISafetyAssessment } from "@/lib/ai-services"

interface AISafetyTipsProps {
  experienceId: string
  experienceType: string
  className?: string
}

export function AISafetyTips({ experienceId, experienceType, className }: AISafetyTipsProps) {
  const [safetyAssessment, setSafetyAssessment] = useState<AISafetyAssessment | null>(null)
  const [safetyTips, setSafetyTips] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSafetyData()
  }, [experienceId, experienceType])

  const loadSafetyData = async () => {
    setLoading(true)
    try {
      const [assessment, tips] = await Promise.all([
        safetyAssessor.assessExperienceSafety(experienceId),
        safetyAssessor.generateSafetyTips(experienceType),
      ])
      setSafetyAssessment(assessment)
      setSafetyTips(tips)
    } catch (error) {
      console.error("Failed to load safety data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "text-green-600 bg-green-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "high":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return <CheckCircle className="h-4 w-4" />
      case "medium":
        return <AlertTriangle className="h-4 w-4" />
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <span>AI Safety Assessment</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {safetyAssessment && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Risk Level</h3>
              <Badge className={getRiskColor(safetyAssessment.riskLevel)}>
                {getRiskIcon(safetyAssessment.riskLevel)}
                <span className="ml-1 capitalize">{safetyAssessment.riskLevel} Risk</span>
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Safety Factors</h4>
                <ul className="space-y-1">
                  {safetyAssessment.factors.map((factor, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              {safetyAssessment.recommendations.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Recommendations</h4>
                  <ul className="space-y-1">
                    {safetyAssessment.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <div>
          <h3 className="font-semibold mb-3">Personalized Safety Tips</h3>
          <div className="space-y-2">
            {safetyTips.map((tip, index) => (
              <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                <Shield className="h-4 w-4 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-blue-800">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-start space-x-3">
            <Info className="h-4 w-4 text-gray-500 mt-0.5" />
            <div className="text-xs text-gray-600">
              <p className="font-medium mb-1">About AI Safety Assessment</p>
              <p>
                Our AI analyzes multiple safety factors using ethical algorithms and conservative approaches. All
                assessments include human oversight and are regularly audited for accuracy and fairness.
              </p>
              <p className="mt-2">Last updated: {safetyAssessment?.lastUpdated.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
