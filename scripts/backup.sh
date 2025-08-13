#!/bin/bash

# X-Hunt Database Backup Script
# This script creates database backups and uploads them to AWS S3

set -e

# Configuration
BACKUP_DIR="/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="xhunt_backup_${TIMESTAMP}.sql"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_FILE}"
COMPRESSED_FILE="${BACKUP_FILE}.gz"
COMPRESSED_PATH="${BACKUP_DIR}/${COMPRESSED_FILE}"

# AWS S3 Configuration
S3_BUCKET="${AWS_S3_BUCKET}"
S3_PREFIX="database-backups"
S3_PATH="s3://${S3_BUCKET}/${S3_PREFIX}/${COMPRESSED_FILE}"

# Retention settings
LOCAL_RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-7}"
S3_RETENTION_DAYS="${S3_RETENTION_DAYS:-30}"

# Logging
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log_error() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1" >&2
}

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

log "Starting database backup..."

# Create database backup
log "Creating PostgreSQL dump..."
if ! pg_dump -h postgres -U "$POSTGRES_USER" -d "$POSTGRES_DB" > "$BACKUP_PATH"; then
    log_error "Failed to create database backup"
    exit 1
fi

log "Database backup created: $BACKUP_PATH"

# Compress the backup
log "Compressing backup..."
if ! gzip "$BACKUP_PATH"; then
    log_error "Failed to compress backup"
    exit 1
fi

log "Backup compressed: $COMPRESSED_PATH"

# Upload to S3 if AWS credentials are configured
if [ -n "$AWS_ACCESS_KEY_ID" ] && [ -n "$AWS_SECRET_ACCESS_KEY" ] && [ -n "$S3_BUCKET" ]; then
    log "Uploading backup to S3..."
    
    if aws s3 cp "$COMPRESSED_PATH" "$S3_PATH" --region "${AWS_REGION:-us-east-1}"; then
        log "Backup uploaded to S3: $S3_PATH"
        
        # Add metadata tags
        aws s3api put-object-tagging \
            --bucket "$S3_BUCKET" \
            --key "${S3_PREFIX}/${COMPRESSED_FILE}" \
            --tagging "TagSet=[{Key=Environment,Value=production},{Key=Application,Value=xhunt},{Key=BackupDate,Value=${TIMESTAMP}}]" \
            --region "${AWS_REGION:-us-east-1}" || log_error "Failed to add tags to S3 object"
    else
        log_error "Failed to upload backup to S3"
    fi
else
    log "AWS credentials not configured, skipping S3 upload"
fi

# Clean up old local backups
log "Cleaning up old local backups (older than $LOCAL_RETENTION_DAYS days)..."
find "$BACKUP_DIR" -name "xhunt_backup_*.sql.gz" -type f -mtime +"$LOCAL_RETENTION_DAYS" -delete

# Clean up old S3 backups
if [ -n "$AWS_ACCESS_KEY_ID" ] && [ -n "$AWS_SECRET_ACCESS_KEY" ] && [ -n "$S3_BUCKET" ]; then
    log "Cleaning up old S3 backups (older than $S3_RETENTION_DAYS days)..."
    
    # Calculate cutoff date
    CUTOFF_DATE=$(date -d "$S3_RETENTION_DAYS days ago" +"%Y-%m-%d")
    
    # List and delete old backups
    aws s3api list-objects-v2 \
        --bucket "$S3_BUCKET" \
        --prefix "$S3_PREFIX/" \
        --query "Contents[?LastModified<='$CUTOFF_DATE'].Key" \
        --output text \
        --region "${AWS_REGION:-us-east-1}" | \
    while read -r key; do
        if [ -n "$key" ] && [ "$key" != "None" ]; then
            log "Deleting old backup: s3://$S3_BUCKET/$key"
            aws s3 rm "s3://$S3_BUCKET/$key" --region "${AWS_REGION:-us-east-1}" || log_error "Failed to delete $key"
        fi
    done
fi

# Verify backup integrity
log "Verifying backup integrity..."
if gunzip -t "$COMPRESSED_PATH"; then
    log "Backup integrity verified successfully"
else
    log_error "Backup integrity check failed"
    exit 1
fi

# Get backup size
BACKUP_SIZE=$(du -h "$COMPRESSED_PATH" | cut -f1)
log "Backup completed successfully. Size: $BACKUP_SIZE"

# Send notification (if webhook URL is configured)
if [ -n "$BACKUP_WEBHOOK_URL" ]; then
    log "Sending backup notification..."
    
    NOTIFICATION_PAYLOAD=$(cat <<EOF
{
    "text": "✅ X-Hunt Database Backup Completed",
    "attachments": [
        {
            "color": "good",
            "fields": [
                {
                    "title": "Backup File",
                    "value": "$COMPRESSED_FILE",
                    "short": true
                },
                {
                    "title": "Size",
                    "value": "$BACKUP_SIZE",
                    "short": true
                },
                {
                    "title": "Timestamp",
                    "value": "$TIMESTAMP",
                    "short": true
                },
                {
                    "title": "S3 Location",
                    "value": "$S3_PATH",
                    "short": false
                }
            ]
        }
    ]
}
EOF
    )
    
    curl -X POST -H 'Content-type: application/json' \
        --data "$NOTIFICATION_PAYLOAD" \
        "$BACKUP_WEBHOOK_URL" || log_error "Failed to send notification"
fi

log "Backup process completed successfully"
exit 0
