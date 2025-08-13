import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight">
                Discover Your Next
                <span className="text-primary block">Adventure</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Book unique outdoor experiences with local experts. From mountain hiking to rock climbing, find your
                perfect adventure and create unforgettable memories.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base">
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-base bg-transparent">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <div>
                <div className="font-heading font-bold text-2xl text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Experiences</div>
              </div>
              <div>
                <div className="font-heading font-bold text-2xl text-primary">50k+</div>
                <div className="text-sm text-muted-foreground">Happy Adventurers</div>
              </div>
              <div>
                <div className="font-heading font-bold text-2xl text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
              <img
                src="/mountain-hiking-trail.png"
                alt="Adventure hiking in mountains"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-card border rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-secondary-foreground text-sm font-semibold">4.9</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Excellent</div>
                  <div className="text-xs text-muted-foreground">2.4k reviews</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-card border rounded-lg p-4 shadow-lg">
              <div className="text-center">
                <div className="font-heading font-bold text-lg text-primary">$120</div>
                <div className="text-xs text-muted-foreground">per person</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
