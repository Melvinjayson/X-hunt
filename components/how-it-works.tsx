import { Card, CardContent } from "@/components/ui/card"
import { Search, Calendar, MapPin, Star } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Browse through hundreds of unique adventure experiences from verified local hosts.",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Calendar,
    title: "Book",
    description: "Choose your dates, select group size, and book instantly with our secure payment system.",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: MapPin,
    title: "Experience",
    description: "Meet your host and embark on an unforgettable adventure with all equipment provided.",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: Star,
    title: "Review",
    description: "Share your experience and help other adventurers discover amazing experiences.",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl mb-4">How X-hunt Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting started with your next adventure is simple. Follow these easy steps to book your experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto`}>
                      <Icon className={`h-8 w-8 ${step.color}`} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading font-semibold text-xl">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                    </div>
                    <div className="text-2xl font-bold text-muted-foreground/30">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
