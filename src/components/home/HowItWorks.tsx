import { MapIcon, TrophyIcon, UserGroupIcon, WalletIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    name: 'Discover',
    description: 'Browse through our curated experiences and challenges based on your interests.',
    icon: MapIcon,
  },
  {
    name: 'Experience',
    description: 'Participate in real-world adventures and complete engaging challenges.',
    icon: UserGroupIcon,
  },
  {
    name: 'Earn',
    description: 'Collect digital rewards, NFTs, and badges for completing experiences.',
    icon: TrophyIcon,
  },
  {
    name: 'Share',
    description: 'Showcase your achievements and trade collectibles with the community.',
    icon: WalletIcon,
  },
];

export function HowItWorks() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How X-hunt Works</h2>
          <p className="mt-4 text-lg text-gray-500">
            Your journey from discovery to digital rewards in four simple steps
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, stepIdx) => (
              <div key={step.name} className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
                  <step.icon className="h-10 w-10 text-primary-600" aria-hidden="true" />
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900">{step.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-primary-50 p-8 sm:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-bold tracking-tight text-primary-900">Ready to start your adventure?</h3>
            <p className="mt-4 text-lg text-primary-700">
              Join X-hunt today and unlock a world of immersive experiences and digital rewards.
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
