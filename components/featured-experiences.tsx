import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Users, ArrowRight } from "lucide-react"
import { mockExperiences } from "@/lib/mock-data"

export function FeaturedExperiences() {
  const featuredExperiences = mockExperiences.slice(0, 6)

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-heading font-bold text-3xl mb-4">Featured Adventures</h2>
            <p className="text-muted-foreground">Handpicked experiences from our top-rated hosts</p>
          </div>
          <Button variant="outline">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredExperiences.map((experience) => (
            <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={experience.images[0] || "/placeholder.svg"}
                  alt={experience.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 text-foreground">
                    {experience.category.charAt(0).toUpperCase() + experience.category.slice(1).replace("-", " ")}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-background/90 rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{experience.rating}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2">{experience.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{experience.shortDescription}</p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{experience.location.city}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{experience.duration.hours}h</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Max {experience.pricing.groupSize.max}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="font-heading font-bold text-lg">${experience.pricing.basePrice}</span>
                      <span className="text-muted-foreground text-sm ml-1">
                        /{experience.pricing.priceType.replace("_", " ")}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        experience.difficulty === "beginner"
                          ? "border-green-500 text-green-700"
                          : experience.difficulty === "intermediate"
                            ? "border-yellow-500 text-yellow-700"
                            : experience.difficulty === "advanced"
                              ? "border-orange-500 text-orange-700"
                              : "border-red-500 text-red-700"
                      }
                    >
                      {experience.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
