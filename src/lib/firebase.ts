// Mock Firebase implementation for build compatibility
// This is a placeholder to resolve import issues during build

export const db = {
  collection: (name: string) => ({
    name,
    doc: () => ({
      id: 'mock-id-' + Math.random().toString(36).substr(2, 9),
      set: (data: any) => Promise.resolve(),
      get: () => Promise.resolve({ exists: false, data: () => null })
    })
  })
};

export const auth = {};
export const storage = {};

// Collection references
export const collections = {
  experiences: { name: 'experiences' },
  challenges: { name: 'challenges' },
  users: { name: 'users' },
  bookings: { name: 'bookings' },
  reviews: { name: 'reviews' },
  hosts: { name: 'hosts' },
  categories: { name: 'categories' }
};

const app = {};
export default app;
