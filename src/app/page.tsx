import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedExperiences } from '@/components/home/FeaturedExperiences';
import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorks } from '@/components/home/HowItWorks';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <CategoryGrid />
        <FeaturedExperiences />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}