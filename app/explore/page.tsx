import { ExperienceGrid } from "@/components/experience-grid"
import { ExperienceFilters } from "@/components/experience-filters"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl mb-2">Explore Adventures</h1>
            <p className="text-muted-foreground">Discover unique experiences from local hosts around the world</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ExperienceFilters />
            </div>
            <div className="lg:col-span-3">
              <ExperienceGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
