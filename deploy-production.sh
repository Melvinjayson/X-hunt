#!/bin/bash

# X-Hunt Production Deployment Script
# This script automates the production deployment process

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="xhunt"
DOCKER_COMPOSE_FILE="docker-compose.yml"
ENV_FILE=".env.production"
BACKUP_DIR="./backups"
LOG_FILE="./deployment.log"

# Functions
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] ✅ $1${NC}" | tee -a "$LOG_FILE"
}

log_warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ❌ $1${NC}" | tee -a "$LOG_FILE"
}

check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    # Check if Docker Compose is installed
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    # Check if .env.production exists
    if [ ! -f "$ENV_FILE" ]; then
        log_error "Production environment file ($ENV_FILE) not found."
        log "Please copy .env.production.template to .env.production and configure it."
        exit 1
    fi
    
    # Check if required environment variables are set
    source "$ENV_FILE"
    
    required_vars=("DATABASE_URL" "NEXTAUTH_SECRET" "NEXTAUTH_URL" "STRIPE_SECRET_KEY")
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ] || [[ "${!var}" == *"CHANGE_ME"* ]] || [[ "${!var}" == *"your-"* ]]; then
            log_error "Required environment variable $var is not properly configured in $ENV_FILE"
            exit 1
        fi
    done
    
    log_success "Prerequisites check passed"
}

create_backup() {
    log "Creating backup..."
    
    # Create backup directory
    mkdir -p "$BACKUP_DIR"
    
    # Backup database if container is running
    if docker-compose ps | grep -q postgres; then
        BACKUP_FILE="$BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).sql"
        docker-compose exec -T postgres pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > "$BACKUP_FILE"
        log_success "Database backup created: $BACKUP_FILE"
    else
        log_warning "PostgreSQL container not running, skipping database backup"
    fi
    
    # Backup current .env file
    if [ -f ".env" ]; then
        cp ".env" "$BACKUP_DIR/.env.backup_$(date +%Y%m%d_%H%M%S)"
        log_success "Environment file backup created"
    fi
}

build_application() {
    log "Building application..."
    
    # Generate Prisma client
    log "Generating Prisma client..."
    npx prisma generate
    
    # Build Docker images
    log "Building Docker images..."
    docker-compose -f "$DOCKER_COMPOSE_FILE" build --no-cache
    
    log_success "Application build completed"
}

deploy_application() {
    log "Deploying application..."
    
    # Copy production environment file
    cp "$ENV_FILE" ".env"
    
    # Stop existing containers
    log "Stopping existing containers..."
    docker-compose -f "$DOCKER_COMPOSE_FILE" down
    
    # Start new containers
    log "Starting new containers..."
    docker-compose -f "$DOCKER_COMPOSE_FILE" up -d
    
    # Wait for database to be ready
    log "Waiting for database to be ready..."
    sleep 30
    
    # Run database migrations
    log "Running database migrations..."
    docker-compose exec -T app npx prisma db push
    
    log_success "Application deployment completed"
}

run_health_checks() {
    log "Running health checks..."
    
    # Wait for application to start
    sleep 10
    
    # Check if containers are running
    if ! docker-compose ps | grep -q "Up"; then
        log_error "Some containers are not running properly"
        docker-compose logs
        exit 1
    fi
    
    # Check application health endpoint
    max_attempts=30
    attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s http://localhost:3000/api/health > /dev/null; then
            log_success "Health check passed"
            break
        else
            log "Health check attempt $attempt/$max_attempts failed, retrying in 10 seconds..."
            sleep 10
            ((attempt++))
        fi
    done
    
    if [ $attempt -gt $max_attempts ]; then
        log_error "Health check failed after $max_attempts attempts"
        log "Application logs:"
        docker-compose logs app
        exit 1
    fi
}

show_deployment_info() {
    log_success "Deployment completed successfully!"
    echo ""
    echo "=== DEPLOYMENT INFORMATION ==="
    echo "Application URL: ${NEXTAUTH_URL:-http://localhost:3000}"
    echo "Health Check: ${NEXTAUTH_URL:-http://localhost:3000}/api/health"
    echo "Admin Dashboard: ${NEXTAUTH_URL:-http://localhost:3000}/admin"
    echo ""
    echo "=== USEFUL COMMANDS ==="
    echo "View logs: docker-compose logs -f"
    echo "Stop application: docker-compose down"
    echo "Restart application: docker-compose restart"
    echo "Database shell: docker-compose exec postgres psql -U \$POSTGRES_USER \$POSTGRES_DB"
    echo ""
    echo "=== MONITORING ==="
    echo "Monitor containers: docker-compose ps"
    echo "Monitor resources: docker stats"
    echo "View application logs: docker-compose logs -f app"
    echo ""
}

rollback() {
    log_warning "Rolling back deployment..."
    
    # Stop current containers
    docker-compose down
    
    # Find latest backup
    LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/backup_*.sql 2>/dev/null | head -n1)
    
    if [ -n "$LATEST_BACKUP" ]; then
        log "Restoring database from: $LATEST_BACKUP"
        docker-compose up -d postgres
        sleep 10
        docker-compose exec -T postgres psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" < "$LATEST_BACKUP"
    fi
    
    # Restore previous environment
    LATEST_ENV_BACKUP=$(ls -t "$BACKUP_DIR"/.env.backup_* 2>/dev/null | head -n1)
    if [ -n "$LATEST_ENV_BACKUP" ]; then
        cp "$LATEST_ENV_BACKUP" ".env"
    fi
    
    # Start containers with previous version
    docker-compose up -d
    
    log_success "Rollback completed"
}

# Main deployment process
main() {
    log "Starting X-Hunt production deployment..."
    
    # Parse command line arguments
    case "${1:-deploy}" in
        "deploy")
            check_prerequisites
            create_backup
            build_application
            deploy_application
            run_health_checks
            show_deployment_info
            ;;
        "rollback")
            rollback
            ;;
        "health")
            run_health_checks
            ;;
        "backup")
            create_backup
            ;;
        *)
            echo "Usage: $0 {deploy|rollback|health|backup}"
            echo ""
            echo "Commands:"
            echo "  deploy   - Full production deployment (default)"
            echo "  rollback - Rollback to previous version"
            echo "  health   - Run health checks only"
            echo "  backup   - Create backup only"
            exit 1
            ;;
    esac
}

# Trap errors and provide rollback option
trap 'log_error "Deployment failed! Run \"$0 rollback\" to rollback to previous version."' ERR

# Run main function
main "$@"
