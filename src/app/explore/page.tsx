import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ExploreFilters } from '@/components/explore/ExploreFilters';
import { ExperienceGrid } from '@/components/explore/ExperienceGrid';

export default function ExplorePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Explore Experiences</h1>
            <p className="mt-2 text-lg text-gray-600">
              Discover unique adventures and challenges in your area
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <ExploreFilters />
            </div>
            <div className="lg:col-span-3">
              <ExperienceGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}