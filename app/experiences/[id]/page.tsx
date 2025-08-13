import { ExperienceDetail } from "@/components/experience-detail"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { mockExperiences } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface ExperiencePageProps {
  params: {
    id: string
  }
}

export default function ExperiencePage({ params }: ExperiencePageProps) {
  const experience = mockExperiences.find((exp) => exp.id === params.id)

  if (!experience) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ExperienceDetail experience={experience} />
      </main>
      <Footer />
    </div>
  )
}
