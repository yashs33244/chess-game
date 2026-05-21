#!/bin/sh
set -e
echo "Running database migrations..."
cd /app/packages/db && node_modules/.bin/prisma migrate deploy
echo "Starting backend server..."
exec node /app/apps/backend/dist/index.js
