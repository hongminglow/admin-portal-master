# Deployment Guide

## Overview

This guide covers various deployment strategies for the Admin Portal Starter template.

## Docker Deployment (Recommended)

### Local Development

```bash
# Start all services
cd apps/api
docker-compose up -d --build

# Check logs
docker-compose logs -f nest-admin-server

# Stop services
docker-compose down
```

### Production Docker

```bash
# Build production images
cd apps/api
docker-compose -f docker-compose.prod.yml up -d --build

# Health check
curl http://localhost:7001/health
```

## Cloud Deployment

### Railway

1. Fork the repository
2. Connect to Railway
3. Deploy backend first (apps/api)
4. Deploy frontend (apps/web)
5. Configure environment variables

### Vercel

Frontend deployment:

```bash
cd apps/web
vercel --prod
```

### DigitalOcean App Platform

```yaml
# .do/app.yaml
name: admin-portal
services:
  - name: api
    source_dir: apps/api
    github:
      repo: your-username/admin-portal-starter
      branch: main
    run_command: pnpm start:prod
    environment_slug: node-js
    instance_count: 1
    instance_size_slug: basic-xxs
    envs:
      - key: NODE_ENV
        value: production
      - key: DB_HOST
        value: ${db.HOSTNAME}
      - key: DB_PASSWORD
        value: ${db.PASSWORD}

  - name: web
    source_dir: apps/web
    github:
      repo: your-username/admin-portal-starter
      branch: main
    build_command: pnpm build
    environment_slug: node-js
    instance_count: 1
    instance_size_slug: basic-xxs

databases:
  - name: db
    engine: MYSQL
    version: "8"
```

### AWS ECS

1. Create ECR repositories
2. Build and push Docker images
3. Create ECS task definitions
4. Deploy using ECS service

## Environment Configuration

### Production Environment Variables

#### Backend (.env.production)

```bash
# Application
NODE_ENV=production
APP_PORT=7001
APP_NAME=Admin Portal API

# Database
DB_HOST=your-db-host
DB_PORT=3306
DB_DATABASE=nest_admin
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password
DB_SYNCHRONIZE=false
DB_LOGGING=["error"]

# Redis
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# Security
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=86400
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRE=2592000

# Swagger
SWAGGER_ENABLE=true
SWAGGER_PATH=api-docs
SWAGGER_SERVER_URL=https://your-api-domain.com
```

#### Frontend (.env.production)

```bash
VITE_SERVICE_BASE_URL=https://your-api-domain.com/api
VITE_SERVICE_SUCCESS_CODE=200
VITE_APP_TITLE=Admin Portal
```

## CI/CD Pipelines

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: "pnpm"

      - run: pnpm install
      - run: pnpm typecheck
      - run: pnpm --filter api test

  deploy-api:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        uses: railwayapp/railway-deploy@v1
        with:
          token: ${{ secrets.RAILWAY_TOKEN }}
          service: api

  deploy-web:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          working-directory: apps/web
```

## Database Setup

### Production Database

1. **Managed Database** (Recommended)

   - AWS RDS MySQL
   - DigitalOcean Managed Database
   - Railway MySQL
   - PlanetScale

2. **Self-hosted Database**

   ```sql
   CREATE DATABASE nest_admin;
   CREATE USER 'admin'@'%' IDENTIFIED BY 'secure_password';
   GRANT ALL PRIVILEGES ON nest_admin.* TO 'admin'@'%';
   FLUSH PRIVILEGES;
   ```

3. **Run Migrations**
   ```bash
   cd apps/api
   NODE_ENV=production pnpm migration:run
   ```

## SSL/TLS Configuration

### Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    # Frontend
    location / {
        try_files $uri $uri/ /index.html;
        root /var/www/html;
    }

    # API
    location /api {
        proxy_pass http://localhost:7001;
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
```

## Performance Optimization

### Frontend Optimization

- Enable gzip compression
- Use CDN for static assets
- Implement service worker caching
- Optimize bundle size

### Backend Optimization

- Enable Redis caching
- Database query optimization
- Use connection pooling
- Implement rate limiting

## Monitoring and Logging

### Application Monitoring

- **Logging**: Winston with structured logs
- **Metrics**: Prometheus + Grafana
- **APM**: New Relic, DataDog, or Sentry
- **Health Checks**: Built-in health endpoint

### Infrastructure Monitoring

- Server metrics (CPU, Memory, Disk)
- Database performance
- Redis cache hit rates
- Network latency

## Backup Strategy

### Database Backups

```bash
# Automated daily backups
mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME > backup_$(date +%Y%m%d).sql

# Restore from backup
mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME < backup_20240831.sql
```

### File Backups

- User uploads (if any)
- Configuration files
- SSL certificates

## Security Checklist

- [ ] HTTPS enabled
- [ ] Database credentials secured
- [ ] JWT secrets rotated
- [ ] Rate limiting configured
- [ ] CORS properly set
- [ ] Security headers enabled
- [ ] Regular dependency updates
- [ ] Firewall rules configured
- [ ] Access logs monitored

## Rollback Strategy

### Quick Rollback

```bash
# Docker rollback
docker-compose down
docker-compose up -d --build [previous-tag]

# Database rollback
pnpm migration:revert
```

### Blue-Green Deployment

1. Deploy to staging environment
2. Run tests on staging
3. Switch traffic to new version
4. Keep old version for quick rollback

## Troubleshooting

### Common Production Issues

1. **Database Connection Timeouts**

   - Check connection pool settings
   - Verify network connectivity
   - Monitor database performance

2. **Memory Leaks**

   - Monitor Node.js heap usage
   - Check for circular references
   - Restart services if needed

3. **High CPU Usage**

   - Profile application performance
   - Check for infinite loops
   - Optimize database queries

4. **SSL Certificate Issues**
   - Verify certificate validity
   - Check certificate chain
   - Ensure proper renewal process
