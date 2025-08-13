import { HeroSection } from "@/components/hero-section"
import { SearchSection } from "@/components/search-section"
import { FeaturedExperiences } from "@/components/featured-experiences"
import { CategoryFilters } from "@/components/category-filters"
import { HowItWorks } from "@/components/how-it-works"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WelcomeModal } from "@/components/onboarding/welcome-modal"
import { OnboardingTooltip } from "@/components/onboarding/onboarding-tooltip"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SearchSection />
        <CategoryFilters />
        <FeaturedExperiences />
        <HowItWorks />
      </main>
      <Footer />
      <WelcomeModal />
      <OnboardingTooltip />
    </div>
  )
}
