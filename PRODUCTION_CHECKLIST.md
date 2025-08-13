# X-Hunt Production Deployment Checklist

## Pre-Deployment Checklist

### 1. Environment Configuration ✅
- [ ] Copy `.env.production.template` to `.env.production`
- [ ] Configure all required environment variables:
  - [ ] `DATABASE_URL` - Production PostgreSQL connection string
  - [ ] `NEXTAUTH_SECRET` - Strong random secret (32+ characters)
  - [ ] `NEXTAUTH_URL` - Production domain URL
  - [ ] `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - OAuth credentials
  - [ ] `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET` - OAuth credentials
  - [ ] `STRIPE_SECRET_KEY` & `STRIPE_PUBLISHABLE_KEY` - Payment processing
  - [ ] `STRIPE_WEBHOOK_SECRET` - Stripe webhook endpoint secret
  - [ ] `RESEND_API_KEY` - Email service
  - [ ] `CLOUDINARY_*` - File upload service
  - [ ] `REDIS_URL` - Cache configuration
  - [ ] `AWS_*` - Backup and storage
  - [ ] `ENCRYPTION_KEY` - Data encryption
  - [ ] `JWT_SECRET` - JWT token signing

### 2. SSL/TLS Configuration ✅
- [ ] Obtain SSL certificates (Let's Encrypt, CloudFlare, or commercial)
- [ ] Place certificates in `nginx/ssl/` directory:
  - [ ] `cert.pem` - SSL certificate
  - [ ] `key.pem` - Private key
- [ ] Update domain configuration in Nginx

### 3. Database Setup ✅
- [ ] Set up production PostgreSQL database
- [ ] Configure database connection pooling
- [ ] Set up database backups
- [ ] Run initial database migration: `npx prisma db push`
- [ ] Seed initial data if needed

### 4. External Services ✅
- [ ] Configure Google OAuth application
- [ ] Configure GitHub OAuth application
- [ ] Set up Stripe account and webhooks
- [ ] Configure Resend email service
- [ ] Set up Cloudinary for file uploads
- [ ] Configure Redis instance
- [ ] Set up AWS S3 for backups

### 5. Security Hardening ✅
- [ ] Review and update security headers in Nginx
- [ ] Configure rate limiting
- [ ] Set up firewall rules
- [ ] Enable fail2ban (optional)
- [ ] Configure log rotation
- [ ] Set up monitoring and alerting

## Deployment Process

### Option 1: Automated Deployment (Recommended)

\`\`\`bash
# 1. Ensure all prerequisites are met
./deploy-production.sh

# 2. Monitor deployment
docker-compose logs -f

# 3. Verify health
curl https://yourdomain.com/api/health
\`\`\`

### Option 2: Manual Deployment

\`\`\`bash
# 1. Copy environment file
cp .env.production .env

# 2. Build and start services
docker-compose -f docker-compose.prod.yml up -d --build

# 3. Run database migrations
docker-compose exec app npx prisma db push

# 4. Verify deployment
docker-compose ps
curl http://localhost/api/health
\`\`\`

## Post-Deployment Verification

### 1. Health Checks ✅
- [ ] Application health: `GET /api/health`
- [ ] Database connectivity
- [ ] Redis connectivity
- [ ] External API connectivity

### 2. Functionality Tests ✅
- [ ] User registration and login
- [ ] OAuth authentication (Google, GitHub)
- [ ] Experience creation and booking
- [ ] Payment processing
- [ ] Email notifications
- [ ] File uploads
- [ ] Admin dashboard access

### 3. Performance Tests ✅
- [ ] Load testing with realistic traffic
- [ ] Database query performance
- [ ] API response times
- [ ] Static asset loading
- [ ] CDN configuration (if applicable)

### 4. Security Tests ✅
- [ ] SSL/TLS configuration
- [ ] Security headers
- [ ] Rate limiting
- [ ] Input validation
- [ ] Authentication flows
- [ ] Authorization checks

### 5. Monitoring Setup ✅
- [ ] Prometheus metrics collection
- [ ] Grafana dashboards
- [ ] Log aggregation (Loki)
- [ ] Error tracking (Sentry)
- [ ] Uptime monitoring
- [ ] Alert notifications

## Monitoring and Maintenance

### Daily Tasks
- [ ] Check application health
- [ ] Review error logs
- [ ] Monitor resource usage
- [ ] Verify backup completion

### Weekly Tasks
- [ ] Review security logs
- [ ] Update dependencies (if needed)
- [ ] Performance analysis
- [ ] Backup verification

### Monthly Tasks
- [ ] Security audit
- [ ] Performance optimization
- [ ] Capacity planning
- [ ] Disaster recovery testing

## Rollback Procedure

If issues occur during deployment:

\`\`\`bash
# Quick rollback
./deploy-production.sh rollback

# Manual rollback
docker-compose down
# Restore previous database backup
# Restart with previous configuration
docker-compose up -d
\`\`\`

## Useful Commands

### Container Management
\`\`\`bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f [service_name]

# Restart services
docker-compose restart [service_name]

# Scale services
docker-compose up -d --scale app=3
\`\`\`

### Database Operations
\`\`\`bash
# Database shell
docker-compose exec postgres psql -U $POSTGRES_USER $POSTGRES_DB

# Create backup
docker-compose exec postgres pg_dump -U $POSTGRES_USER $POSTGRES_DB > backup.sql

# Restore backup
docker-compose exec -T postgres psql -U $POSTGRES_USER $POSTGRES_DB < backup.sql
\`\`\`

### Monitoring
\`\`\`bash
# System resources
docker stats

# Application metrics
curl http://localhost/api/metrics

# Health check
curl http://localhost/api/health
\`\`\`

## Troubleshooting

### Common Issues

1. **Application won't start**
   - Check environment variables
   - Verify database connectivity
   - Review application logs

2. **Database connection errors**
   - Verify DATABASE_URL
   - Check PostgreSQL container status
   - Review network connectivity

3. **SSL/TLS issues**
   - Verify certificate files
   - Check Nginx configuration
   - Review domain DNS settings

4. **Performance issues**
   - Monitor resource usage
   - Check database queries
   - Review caching configuration

### Support Contacts
- Development Team: [team@xhunt.com]
- Infrastructure: [ops@xhunt.com]
- Security: [security@xhunt.com]

## Compliance and Legal

- [ ] GDPR compliance review
- [ ] Privacy policy updated
- [ ] Terms of service updated
- [ ] Data retention policies
- [ ] Cookie consent implementation
- [ ] Accessibility compliance (WCAG)

---

**Last Updated:** $(date)
**Version:** 1.0.0
**Environment:** Production
