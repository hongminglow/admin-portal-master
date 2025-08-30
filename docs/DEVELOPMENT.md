# Development Guide

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- PNPM >= 9.0.0
- Docker & Docker Compose

### Development Workflow

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Start development servers**

   ```bash
   # Start both frontend and backend
   pnpm dev

   # Or individually
   pnpm dev:web  # Frontend on http://localhost:5173
   pnpm dev:api  # Backend on http://localhost:7001
   ```

3. **Database setup**
   ```bash
   cd apps/api
   docker-compose up -d mysql redis
   pnpm migration:run
   ```

## Architecture Overview

### Frontend (apps/web)

- **Framework**: Vue 3 + Composition API
- **Build Tool**: Vite 7
- **UI Library**: Naive UI
- **Styling**: UnoCSS
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Type Checking**: TypeScript strict mode

### Backend (apps/api)

- **Framework**: NestJS 11
- **Database**: MySQL with TypeORM
- **Cache**: Redis
- **Authentication**: JWT + Passport
- **Documentation**: Swagger
- **Validation**: Class Validator
- **Testing**: Jest

### Shared Packages

- **@sa/axios**: HTTP client utilities
- **@sa/color**: Theme color system
- **@sa/hooks**: Reusable Vue hooks
- **@sa/materials**: UI components library
- **@sa/scripts**: Build and development scripts
- **@sa/uno-preset**: UnoCSS configuration
- **@sa/utils**: Shared utility functions

## Key Features

### Authentication System

1. **Login Flow**:

   - User enters credentials + captcha
   - Backend validates and returns JWT
   - Frontend stores token and user info
   - Subsequent requests use Bearer token

2. **Route Protection**:

   - Frontend: Route guards check auth status
   - Backend: JWT guards protect endpoints
   - Role-based access control (RBAC)

3. **Token Refresh**:
   - Automatic token refresh on expiry
   - Graceful handling of auth failures

### Dashboard Integration

- Real-time metrics from backend
- Responsive card layout
- Error handling with fallbacks
- Loading states and animations

### Error Handling

- Structured error responses from API
- User-friendly error messages
- Detailed console logging for debugging
- Form validation with real-time feedback

## Development Tips

### Adding New Features

#### Frontend Components

```bash
cd apps/web/src/components
mkdir feature-name
# Add index.vue, types.ts, etc.
```

#### Backend Modules

```bash
cd apps/api
nest g module feature-name
nest g controller feature-name
nest g service feature-name
```

#### Database Changes

```bash
cd apps/api
# Create migration
pnpm migration:generate ./src/migrations/AddFeatureTable
# Run migration
pnpm migration:run
```

### Code Style

- Use TypeScript strict mode
- Follow Vue 3 Composition API patterns
- Use NestJS decorators and dependency injection
- Implement proper error handling
- Write unit tests for critical logic

### Environment Variables

- Never commit .env files with secrets
- Use .env.example templates
- Document all required variables
- Use different configs for dev/prod

### Performance Optimization

- Use lazy loading for routes
- Implement proper caching strategies
- Optimize database queries
- Use CDN for static assets
- Enable gzip compression

## Testing

### Frontend Testing

```bash
cd apps/web
# Component tests (if implemented)
pnpm test
# Type checking
pnpm typecheck
```

### Backend Testing

```bash
cd apps/api
# Unit tests
pnpm test
# E2E tests
pnpm test:e2e
```

## Deployment

### Development Deployment

```bash
# Docker development
pnpm docker:up
```

### Production Deployment

1. Update environment variables
2. Build applications: `pnpm build`
3. Deploy with your preferred method:
   - Docker: `docker-compose up -d`
   - K8s: Use provided manifests
   - Serverless: Vercel, Netlify, etc.

## Troubleshooting

### Common Issues

1. **Port conflicts**

   - Check if ports 3000, 5173, 7001 are available
   - Update port configs in .env files

2. **Database connection**

   - Ensure MySQL is running
   - Check connection credentials
   - Verify network connectivity

3. **Dependencies**

   - Clear node_modules: `pnpm clean`
   - Reinstall: `pnpm install`
   - Check PNPM version compatibility

4. **TypeScript errors**
   - Run type checking: `pnpm typecheck`
   - Check for missing dependencies
   - Verify import paths

### Debug Mode

- Frontend: Open browser DevTools
- Backend: Use `pnpm dev:debug` for debugging
- Database: Check logs with `docker-compose logs mysql`

## Contributing

1. Follow the existing code style
2. Write tests for new features
3. Update documentation
4. Create meaningful commit messages
5. Test thoroughly before submitting PR
