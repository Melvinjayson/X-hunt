# X-Hunt Production Deployment Guide

## 🚀 Production Readiness Checklist

### ✅ **Phase 1: Environment & Configuration**

#### 1.1 Environment Variables Setup
Create `.env.production` with real production values:

```bash
# Copy template and edit with production values
cp .env.example .env.production
```

**Critical Variables to Configure:**
```bash
# Database - Use production PostgreSQL
DATABASE_URL="postgresql://prod_user:secure_password@prod-db-host:5432/xhunt_prod"

# Authentication - Generate secure secrets
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# OAuth - Real provider credentials
GOOGLE_CLIENT_ID="your-production-google-client-id"
GOOGLE_CLIENT_SECRET="your-production-google-client-secret"
GITHUB_CLIENT_ID="your-production-github-client-id"
GITHUB_CLIENT_SECRET="your-production-github-client-secret"

# Stripe - Production keys
STRIPE_SECRET_KEY="sk_live_your-production-stripe-secret"
STRIPE_PUBLISHABLE_KEY="pk_live_your-production-stripe-publishable"
STRIPE_WEBHOOK_SECRET="whsec_your-production-webhook-secret"

# Email Service
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"
SMTP_FROM="noreply@yourdomain.com"

# File Upload
CLOUDINARY_CLOUD_NAME="your-production-cloudinary"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# Redis
REDIS_URL="redis://prod-redis-host:6379"

# Security
ENCRYPTION_KEY="$(openssl rand -base64 32)"
JWT_SECRET="$(openssl rand -base64 32)"

# Application
APP_URL="https://yourdomain.com"
NODE_ENV="production"
```

#### 1.2 Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Deploy database schema
npx prisma db push

# Seed initial data (optional)
npx prisma db seed
```

### ✅ **Phase 2: Replace Mock Data with Real APIs**

#### 2.1 Admin Dashboard APIs
The following files need to be updated to use real database queries instead of mock data:

- `src/app/admin/organizations/page.tsx` (lines 60-144)
- `src/app/admin/users/page.tsx` (lines 62-154)
- `src/app/admin/page.tsx` (lines 60-108)
- `src/app/admin/analytics/page.tsx` (lines 64-141)
- `src/app/host/experiences/page.tsx` (lines 27-66)
- `src/app/experience/[id]/page.tsx` (lines 68+)

#### 2.2 API Implementation Status
✅ **Completed APIs:**
- `/api/experiences` - CRUD operations
- `/api/bookings` - Booking management
- `/api/users` - User profile management
- `/api/payments` - Stripe integration
- `/api/notifications` - Notification system
- `/api/challenges` - Gamification
- `/api/webhooks/stripe` - Payment webhooks
- `/api/health` - Health monitoring
- `/api/admin/*` - Admin endpoints

### ✅ **Phase 3: Security & Performance**

#### 3.1 Security Hardening
```bash
# Install security packages
npm install helmet cors express-rate-limit
```

Update `next.config.js`:
```javascript
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    domains: ['yourdomain.com', 'cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
    },
  ],
}
```

#### 3.2 Performance Optimization
```bash
# Install Redis for caching
npm install redis ioredis

# Install compression
npm install compression
```

### ✅ **Phase 4: Docker Production Deployment**

#### 4.1 Production Docker Compose
Update `docker-compose.yml` for production:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: xhunt_prod
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    networks:
      - xhunt-network

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    networks:
      - xhunt-network

  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    networks:
      - xhunt-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped
    networks:
      - xhunt-network

volumes:
  postgres_data:

networks:
  xhunt-network:
    driver: bridge
```

#### 4.2 Nginx Configuration
Create `nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:3000;
    }

    server {
        listen 80;
        server_name yourdomain.com;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name yourdomain.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;

        location / {
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

### ✅ **Phase 5: Deployment Commands**

#### 5.1 Production Build & Deploy
```bash
# Build production image
docker-compose -f docker-compose.yml build

# Start production services
docker-compose -f docker-compose.yml up -d

# Run database migrations
docker-compose exec app npx prisma db push

# Check health
curl https://yourdomain.com/api/health
```

#### 5.2 Monitoring Setup
```bash
# View logs
docker-compose logs -f app

# Monitor resources
docker stats

# Health check
watch -n 30 'curl -s https://yourdomain.com/api/health | jq .'
```

### ✅ **Phase 6: Post-Deployment Verification**

#### 6.1 Functional Testing
- [ ] User registration/login
- [ ] Experience browsing
- [ ] Booking flow
- [ ] Payment processing
- [ ] Admin dashboard
- [ ] Host dashboard
- [ ] Notifications
- [ ] Challenges/rewards

#### 6.2 Performance Testing
- [ ] Load testing with 100+ concurrent users
- [ ] Database query performance
- [ ] Image loading optimization
- [ ] API response times < 200ms

#### 6.3 Security Testing
- [ ] SSL certificate validation
- [ ] OWASP security headers
- [ ] Authentication flows
- [ ] Payment security (PCI compliance)
- [ ] Data encryption

### 🚨 **Critical Issues to Address**

1. **Image Loading**: Replace Unsplash random URLs with proper image management
2. **Authentication**: Implement real OAuth providers
3. **Mock Data**: Replace all hardcoded data with database queries
4. **Environment Secrets**: Generate and configure all production secrets
5. **SSL Certificates**: Obtain and configure SSL certificates
6. **Domain Setup**: Configure DNS and domain routing
7. **Monitoring**: Set up error tracking (Sentry) and logging
8. **Backup Strategy**: Implement automated database backups

### 📊 **Estimated Timeline**

- **Phase 1-2**: 3-5 days (Environment + API fixes)
- **Phase 3-4**: 2-3 days (Security + Docker setup)
- **Phase 5-6**: 2-3 days (Deployment + Testing)

**Total: 7-11 days for production-ready deployment**

### 🆘 **Emergency Rollback Plan**

```bash
# Stop current deployment
docker-compose down

# Restore from backup
docker-compose exec postgres pg_restore -d xhunt_prod /backup/latest.sql

# Start previous version
docker-compose up -d
```

---

**Next Steps**: Start with Phase 1 (Environment setup) and work through each phase systematically. Each phase should be tested before proceeding to the next.