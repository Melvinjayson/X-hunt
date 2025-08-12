import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    name: 'Foodies',
    description: 'Culinary adventures and tastings',
    href: '/category/foodies',
    imageSrc: 'https://source.unsplash.com/random/800x600/?food',
  },
  {
    name: 'Outdoorsy',
    description: 'Nature and adventure experiences',
    href: '/category/outdoorsy',
    imageSrc: 'https://source.unsplash.com/random/800x600/?nature',
  },
  {
    name: 'Art & Culture',
    description: 'Creative and cultural immersions',
    href: '/category/art-culture',
    imageSrc: 'https://source.unsplash.com/random/800x600/?art',
  },
  {
    name: 'Wellness',
    description: 'Mindfulness and health journeys',
    href: '/category/wellness',
    imageSrc: 'https://source.unsplash.com/random/800x600/?wellness',
  },
  {
    name: 'Edutainment',
    description: 'Learning through fun experiences',
    href: '/category/edutainment',
    imageSrc: 'https://source.unsplash.com/random/800x600/?learning',
  },
  {
    name: 'Spiritual',
    description: 'Soul-enriching experiences',
    href: '/category/spiritual',
    imageSrc: 'https://source.unsplash.com/random/800x600/?spiritual',
  },
  {
    name: 'Adventure',
    description: 'Thrilling and adrenaline-pumping activities',
    href: '/category/adventure',
    imageSrc: 'https://source.unsplash.com/random/800x600/?adventure',
  },
  {
    name: 'Urban Exploration',
    description: 'City discoveries and hidden gems',
    href: '/category/urban-exploration',
    imageSrc: 'https://source.unsplash.com/random/800x600/?city',
  },
];

export function CategoryGrid() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Browse by Category</h2>
          <p className="mt-4 text-lg text-gray-500">
            Discover experiences and challenges tailored to your interests
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02]"
            >
              <div className="aspect-h-1 aspect-w-1 h-64 w-full overflow-hidden">
                <Image
                  src={category.imageSrc}
                  alt={category.name}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="mt-1 text-sm text-gray-200">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}