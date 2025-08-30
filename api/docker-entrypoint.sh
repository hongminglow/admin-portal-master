#!/bin/sh
set -e

echo "Starting database migration..."

# Set NODE_ENV
export NODE_ENV=production

# Check if migrations table exists to determine if we need to run migrations
echo "Checking if database needs migration..."
MIGRATION_NEEDED=$(mysql -h mysql -P 3307 -u root -proot -D nest_admin -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'nest_admin' AND table_name = 'migrations';" -s -N 2>/dev/null || echo "1")

if [ "$MIGRATION_NEEDED" = "0" ]; then
    echo "Database schema not found, running migration..."
    # Run database migrations directly without cross-env, with longer timeout
    npx typeorm-ts-node-esm -d ./dist/config/database.config.js migration:run --timeout 300000
    echo "Migration completed successfully"
else
    echo "Database schema already exists, skipping migration..."
fi

echo "Starting application..."

# Start the application
exec pm2-runtime ecosystem.config.js
