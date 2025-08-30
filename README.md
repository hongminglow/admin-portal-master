# Admin Portal Starter 🚀

A production-ready full-stack admin portal starter template with modern architecture and best practices.

## 🏗️ Architecture

```
admin-portal-starter/
├── apps/
│   ├── web/          # Vue 3 + Vite frontend
│   └── api/          # NestJS backend
├── packages/         # Shared libraries
│   ├── axios/        # HTTP client utilities
│   ├── color/        # Theme color system
│   ├── hooks/        # Reusable Vue hooks
│   ├── materials/    # UI components
│   ├── scripts/      # Build & dev scripts
│   ├── uno-preset/   # UnoCSS preset
│   └── utils/        # Shared utilities
└── docs/            # Documentation
```

## ✨ Features

### Frontend (Vue 3)

- 🎨 **Modern UI**: Naive UI + UnoCSS for beautiful interfaces
- 🔐 **Authentication**: JWT-based auth with refresh tokens
- 🎯 **Type Safety**: Full TypeScript support
- 📱 **Responsive**: Mobile-first design
- 🌐 **I18n**: Multi-language support
- 🎭 **Themes**: Dark/light mode switching
- 📊 **Dashboard**: Real-time metrics and charts

### Backend (NestJS)

- 🛡️ **Security**: JWT auth, RBAC, rate limiting
- 📊 **Database**: TypeORM + MySQL with migrations
- 🚀 **Performance**: Redis caching, optimized queries
- 📝 **API Docs**: Auto-generated Swagger documentation
- 🐳 **Docker**: Production-ready containerization
- 📧 **Email**: Mailer integration with templates
- 📋 **Logging**: Structured logging with rotation

### DevOps & Infrastructure

- 🏗️ **Monorepo**: PNPM workspaces for efficient development
- 🔄 **CI/CD**: GitHub Actions workflows
- 🐳 **Docker**: Multi-stage builds with compose
- 📦 **Build Tools**: Optimized Vite + Nest CLI
- 🧪 **Testing**: Jest unit tests
- 📏 **Code Quality**: TypeScript strict mode

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- PNPM >= 9.0.0
- Docker & Docker Compose

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd admin-portal-starter
pnpm install
```

### 2. Start Development

```bash
# Start both frontend and backend
pnpm dev

# Or start individually
pnpm dev:web    # Frontend only (http://localhost:5173)
pnpm dev:api    # Backend only (http://localhost:7001)
```

### 3. Production Deployment

```bash
# Build everything
pnpm build

# Start with Docker
pnpm docker:up
```

## 📖 Documentation

### Environment Setup

#### Frontend (.env files in apps/web/)

```bash
# Development
VITE_SERVICE_BASE_URL=http://localhost:7001/api
VITE_SERVICE_SUCCESS_CODE=200

# Production
VITE_SERVICE_BASE_URL=https://your-api-domain.com/api
```

#### Backend (.env files in apps/api/)

```bash
# App
APP_PORT=7001
APP_NAME=Admin Portal API

# Database
DB_HOST=mysql
DB_PORT=3307
DB_DATABASE=nest_admin
DB_USERNAME=root
DB_PASSWORD=123456

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=123456

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRE=86400
```

### Available Scripts

#### Root Level

- `pnpm dev` - Start both apps in development
- `pnpm build` - Build both apps for production
- `pnpm typecheck` - Type check all TypeScript
- `pnpm test` - Run all tests
- `pnpm docker:up` - Start with Docker Compose
- `pnpm clean` - Clean all node_modules

#### Frontend (apps/web)

- `pnpm dev` - Development server
- `pnpm build` - Production build
- `pnpm preview` - Preview production build
- `pnpm typecheck` - TypeScript checking

#### Backend (apps/api)

- `pnpm dev` - Development server
- `pnpm build` - Production build
- `pnpm start:prod` - Start production server
- `pnpm migration:run` - Run database migrations
- `pnpm test` - Run unit tests

### API Documentation

Once the backend is running, visit:

- Swagger UI: http://localhost:7001/api-docs
- Health Check: http://localhost:7001/health

### Key Integration Points

#### Authentication Flow

1. **Login**: POST `/api/auth/login` with captcha
2. **Profile**: GET `/api/account/profile`
3. **Dashboard**: GET `/api/dashboard/cards`

#### Error Handling

- Frontend displays formatted error messages from backend
- Backend returns structured errors with codes
- Console logging for debugging

## 🛠️ Development

### Adding New Features

#### Frontend

```bash
cd apps/web
# Add new pages in src/views/
# Add new components in src/components/
# Update routes in src/router/
```

#### Backend

```bash
cd apps/api
# Generate module: nest g module feature
# Generate controller: nest g controller feature
# Generate service: nest g service feature
```

### Database Migrations

```bash
cd apps/api
pnpm migration:generate ./src/migrations/FeatureName
pnpm migration:run
```

### Shared Packages

Add new shared utilities in `packages/` directory:

```bash
packages/
└── your-package/
    ├── package.json
    ├── src/
    └── tsconfig.json
```

## 🔧 Configuration

### Docker Development

```bash
# Start services
cd apps/api
docker-compose up -d

# View logs
docker-compose logs -f nest-admin-server
```

### Production Deployment

1. Update environment variables
2. Build applications: `pnpm build`
3. Deploy with Docker: `pnpm docker:up`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vue 3](https://vuejs.org/) - The Progressive JavaScript Framework
- [NestJS](https://nestjs.com/) - A progressive Node.js framework
- [Naive UI](https://www.naiveui.com/) - Vue 3 Component Library
- [UnoCSS](https://unocss.dev/) - Instant On-demand Atomic CSS Engine
- [TypeORM](https://typeorm.io/) - ORM for TypeScript and JavaScript

---

## 🚀 Quick Deploy

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.app/new)
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new)

---

**Happy coding! 🎉**
