#!/bin/bash
set -e

echo "Redeploying application..."

# Pull latest changes
git pull

# Ensure .env file exists
if [ ! -f .env ]; then
  echo "Creating .env file..."
  cat > .env << EOL
COMPOSE_DOCKER_CLI_BUILD=1
DOCKER_BUILDKIT=1
EOL
fi

# Rebuild and restart containers
echo "Stopping containers..."
docker compose down

echo "Rebuilding containers..."
docker compose build --no-cache

echo "Starting containers..."
docker compose up -d

# Run database migrations
echo "Running database migrations..."
docker compose exec backend sh -c "cd /app/packages/db && npx prisma db push"

echo "Redeployment complete!" 