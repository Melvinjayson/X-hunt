# X-hunt Deployment Guide

This guide covers deploying the X-hunt application to production environments.

## Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- Redis (optional, for caching)
- Docker & Docker Compose (for containerized deployment)
- SSL certificates (for HTTPS)

## Environment Setup

### 1. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

**Required Variables:**
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Random 32-character string
- `NEXTAUTH_URL`: Your domain URL
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: OAuth credentials
- `STRIPE_SECRET_KEY` & `STRIPE_PUBLISHABLE_KEY`: Payment processing

### 2. Database Setup

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Seed initial data (optional)
npx prisma db seed
```

## Deployment Options

### Option 1: Docker Compose (Recommended)

1. **Configure environment:**
   ```bash
   # Create production environment file
   cp .env.example .env.production
   # Edit .env.production with production values
   ```

2. **Build and start services:**
   ```bash
   docker-compose up -d
   ```

3. **Run database migrations:**
   ```bash
   docker-compose exec app npx prisma db push
   ```

### Option 2: Manual Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

### Option 3: Vercel Deployment

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Configure environment variables in Vercel dashboard**

## Database Configuration

### PostgreSQL Setup

```sql
-- Create database and user
CREATE DATABASE xhunt_db;
CREATE USER xhunt_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE xhunt_db TO xhunt_user;
```

### Connection Pooling (Recommended)

For production, use connection pooling:

```bash
# Using PgBouncer
DATABASE_URL="postgresql://xhunt_user:password@pgbouncer:5432/xhunt_db"
```

## Security Considerations

### 1. Environment Variables
- Never commit `.env` files
- Use strong, unique secrets
- Rotate secrets regularly

### 2. Database Security
- Use SSL connections
- Implement proper user permissions
- Regular backups

### 3. Application Security
- Enable HTTPS
- Configure CORS properly
- Implement rate limiting
- Use security headers

## Monitoring & Health Checks

### Health Check Endpoint
```
GET /api/health
```

Returns application health status including:
- Database connectivity
- Environment configuration
- Memory usage
- Response times

### Monitoring Setup

1. **Application Monitoring:**
   - Use tools like Sentry for error tracking
   - Implement logging with structured logs

2. **Infrastructure Monitoring:**
   - Monitor CPU, memory, disk usage
   - Database performance metrics
   - Response times and error rates

## Performance Optimization

### 1. Caching
- Redis for session storage
- Database query caching
- Static asset caching

### 2. Database Optimization
- Proper indexing
- Query optimization
- Connection pooling

### 3. CDN Setup
- Serve static assets via CDN
- Image optimization
- Gzip compression

## Backup Strategy

### Database Backups
```bash
# Daily automated backup
pg_dump -h localhost -U xhunt_user xhunt_db > backup_$(date +%Y%m%d).sql
```

### File Backups
- User uploaded content
- Application logs
- Configuration files

## Scaling Considerations

### Horizontal Scaling
- Load balancer configuration
- Session store externalization
- Database read replicas

### Vertical Scaling
- Resource monitoring
- Performance bottleneck identification
- Capacity planning

## Troubleshooting

### Common Issues

1. **Database Connection Errors:**
   - Check DATABASE_URL format
   - Verify network connectivity
   - Check user permissions

2. **Authentication Issues:**
   - Verify OAuth credentials
   - Check NEXTAUTH_URL configuration
   - Ensure NEXTAUTH_SECRET is set

3. **Payment Processing:**
   - Verify Stripe keys
   - Check webhook endpoints
   - Monitor Stripe dashboard

### Logs

```bash
# View application logs
docker-compose logs app

# View database logs
docker-compose logs postgres

# Follow logs in real-time
docker-compose logs -f
```

## Maintenance

### Regular Tasks
- Update dependencies
- Security patches
- Database maintenance
- Log rotation
- Backup verification

### Update Process
1. Test in staging environment
2. Create database backup
3. Deploy new version
4. Run migrations
5. Verify functionality
6. Monitor for issues

## Support

For deployment issues:
1. Check application logs
2. Verify environment configuration
3. Test database connectivity
4. Review security settings
5. Monitor performance metrics