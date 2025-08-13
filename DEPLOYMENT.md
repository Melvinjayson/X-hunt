# X-hunt Deployment Guide

## Quick Deploy to Vercel (Recommended)

1. **Fork/Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/x-hunt.git
   cd x-hunt
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your values
   \`\`\`

4. **Deploy to Vercel**
   \`\`\`bash
   npm run deploy
   \`\`\`

## Environment Setup

### Required Environment Variables
- `NEXT_PUBLIC_APP_URL`: Your domain URL
- `NEXT_PUBLIC_APP_NAME`: Application name
- `NEXTAUTH_SECRET`: Authentication secret (32+ characters)

### Optional Environment Variables
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`: Google Analytics tracking ID
- `SENTRY_DSN`: Error monitoring with Sentry
- `STRIPE_PUBLISHABLE_KEY`: Payment processing
- `OPENAI_API_KEY`: AI features integration

## Production Checklist

### Pre-deployment
- [ ] Update environment variables in `.env.local`
- [ ] Run `npm run type-check` to verify TypeScript
- [ ] Run `npm run lint` to check code quality
- [ ] Test build locally with `npm run build`
- [ ] Update `NEXT_PUBLIC_APP_URL` in environment variables

### Security
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure CSP headers (already in next.config.mjs)
- [ ] Set up rate limiting for API routes
- [ ] Review and update CORS settings
- [ ] Enable security headers (already configured)

### Performance
- [ ] Enable image optimization (configured)
- [ ] Set up CDN for static assets
- [ ] Configure caching strategies
- [ ] Enable compression (configured)
- [ ] Monitor Core Web Vitals

### Monitoring
- [ ] Set up error tracking (Sentry recommended)
- [ ] Configure analytics (Google Analytics/Vercel Analytics)
- [ ] Set up uptime monitoring
- [ ] Configure log aggregation
- [ ] Set up performance monitoring

## Docker Deployment

### Build and run locally
\`\`\`bash
npm run docker:build
npm run docker:run
\`\`\`

### Using Docker Compose
\`\`\`bash
npm run docker:compose
\`\`\`

## Manual Server Deployment

### Prerequisites
- Node.js 18+ 
- PM2 for process management
- Nginx for reverse proxy
- SSL certificate

### Steps
1. **Build the application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start with PM2**
   \`\`\`bash
   pm2 start npm --name "x-hunt" -- start
   \`\`\`

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   \`\`\`

## Database Setup (Optional)

If using a real database instead of mock data:

1. **PostgreSQL Setup**
   \`\`\`bash
   # Create database
   createdb xhunt
   
   # Run migrations
   npm run db:migrate
   
   # Seed data
   npm run db:seed
   \`\`\`

2. **Environment Variables**
   \`\`\`env
   DATABASE_URL=postgresql://user:password@localhost:5432/xhunt
   \`\`\`

## Monitoring and Maintenance

### Health Checks
- Health endpoint: `/api/health`
- Monitoring script: `npm run health-check`

### Logs
- Application logs: Check Vercel dashboard or server logs
- Error tracking: Sentry integration available

### Updates
\`\`\`bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build and deploy
npm run build
npm run deploy
\`\`\`

## Troubleshooting

### Common Issues
1. **Build failures**: Check TypeScript errors with `npm run type-check`
2. **Environment variables**: Ensure all required vars are set
3. **Image optimization**: Verify image domains in next.config.mjs
4. **API routes**: Check function timeout limits in vercel.json

### Support
- Check GitHub issues: [Repository Issues](https://github.com/your-username/x-hunt/issues)
- Documentation: [Next.js Docs](https://nextjs.org/docs)
- Vercel Support: [Vercel Help](https://vercel.com/help)
