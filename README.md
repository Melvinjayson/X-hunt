# X-hunt

X-hunt is a next-generation, AI-native experience marketplace and engagement platform. It empowers brands, creators, and hosts to deliver real-world challenges and digital rewards, combining immersive discovery-based experiences, loyalty programs with gamified mechanics, NFT collectibles and digital badges, interactive storytelling, social sharing, and native AI for personalization, moderation, and intelligence.

## Features

### 🧭 Experience Marketplace
- Airbnb-inspired category-based UI for Foodies, Outdoorsy, Art, Wellness, Edutainment, Spiritual, and Adventure
- Real listings with geo-localized discovery
- Native AI recommendation engine using interest tagging, cohort clustering, and LLM-powered search

### 🧠 Native AI Engine
- User onboarding quiz → preference and intent modeling
- AI-powered discovery feed with memory and contextual ranking
- Auto-tagging of listings using GPT-Vision and user signals
- Smart review summarization + sentiment-based trust scoring
- GPT-4o agent for guided exploration and planning

### 🎁 Rewards & Loyalty Engine
- Customizable loyalty programs (points, tiers, redemptions)
- Experience completion = reward unlock (NFT, XP, tokens)
- Brands can issue collectibles as NFTs via Mintbase or Lens
- Badge system with wallet integration (ERC-721 or ERC-1155)

### 💸 Creator Economy Infrastructure
- Stripe Connect integration for monetization
- Host dashboards with booking + revenue insights, dynamic pricing and refund control, creator tiers and early access tools

### 🧾 Econometrics + Analytics Layer
- Real-time user and listing metrics
- Predictive demand and engagement modeling
- Creator leaderboards and trend forecasting
- User journey heatmaps and conversion funnels

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/x-hunt.git
cd x-hunt/xhunt
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Set up the database
```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push
```

5. Start the development server
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL with Prisma
- **Authentication**: NextAuth.js with Google & GitHub OAuth
- **Payments**: Stripe with webhooks
- **Caching**: Redis (optional)
- **Validation**: Zod for type-safe validation
- **Deployment**: Docker, Vercel, or traditional hosting
- **AI**: OpenAI GPT-4o, Embedding models for recommendations
- **Blockchain**: Ethereum, ERC-721/ERC-1155 for NFTs

## Backend Integration

The application now includes a complete backend with:

### Database Schema
- **Users & Authentication**: User profiles, OAuth accounts, sessions
- **Experiences**: Host profiles, experiences, availability, bookings
- **Payments**: Stripe integration, payment tracking, refunds
- **Gamification**: Challenges, rewards, user progress tracking
- **Notifications**: Real-time notifications system
- **Reviews**: Experience reviews and ratings

### API Endpoints
- `/api/experiences` - CRUD operations for experiences
- `/api/bookings` - Booking management and payments
- `/api/users` - User profile management
- `/api/challenges` - Gamification system
- `/api/payments` - Payment processing with Stripe
- `/api/notifications` - Notification management
- `/api/health` - Application health monitoring

## Deployment

Multiple deployment options are available:

### Docker Compose (Recommended)
```bash
# Start all services (app, database, redis)
docker-compose up -d
```

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Vercel
```bash
# Deploy to Vercel
vercel --prod
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Project Structure

```
/src
  /app - Next.js App Router pages
  /components - React components
    /layout - Layout components (Header, Footer, etc.)
    /home - Homepage components
    /explore - Explore page components
    /challenges - Challenge components
    /rewards - Rewards components
    /profile - User profile components
    /host - Host dashboard components
    /ui - Reusable UI components
  /lib - Utility functions and shared code
  /styles - Global styles
  /types - TypeScript type definitions
  /hooks - Custom React hooks
  /context - React context providers
  /services - API service functions
/public - Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.