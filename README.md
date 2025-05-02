# Chess Application

A full-stack chess application with React frontend, Express backend, and WebSocket server.

## Prerequisites

- Docker and Docker Compose
- Node.js and npm (for local development)
- Git

## Quick Start

1. Clone the repository:
   ```
   git clone <repository-url>
   cd chess-app
   ```

2. Create a `.env` file in the root directory:
   ```
   # Docker Compose Environment Variables
   COMPOSE_DOCKER_CLI_BUILD=1
   DOCKER_BUILDKIT=1

   # Frontend Environment Variables
   VITE_APP_WS_URL=ws://localhost:8080
   VITE_APP_BACKEND_URL=http://localhost:3003

   # Backend Environment Variables
   DATABASE_URL=postgresql://postgres:postgres@postgres:5432/chess?schema=public
   NODE_ENV=production
   PORT=3003
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ALLOWED_HOSTS=http://localhost:5173
   AUTH_REDIRECT_URL=http://localhost:5173/game/random
   
   # Database Environment Variables
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=chess
   ```

3. Start the application with Docker Compose:
   ```
   docker compose up -d
   ```

4. Access the application:
   - Frontend: http://localhost (served directly by Node.js)
   - Backend API: http://localhost:3003
   - WebSocket: ws://localhost:8080

## Database Setup

To initialize or update the database schema:

```bash
# Run the database setup script
./scripts/db-setup.sh

# Or run it manually
cd packages/db
npx prisma generate
npx prisma db push
```

## Development

For local development:

1. Install dependencies:
   ```
   npm install
   ```

2. Run the frontend:
   ```
   cd apps/frontend
   npm run dev
   ```

3. Run the backend:
   ```
   cd apps/backend
   npm run dev
   ```

4. Run the WebSocket server:
   ```
   cd apps/ws
   npm run dev
   ```

## Redeployment

To redeploy the application:

```bash
./scripts/redeploy.sh
```

## Environment Variables

Create a `.env` file with the following variables:

```
# Docker Compose Environment Variables
COMPOSE_DOCKER_CLI_BUILD=1
DOCKER_BUILDKIT=1

# Frontend Environment Variables
VITE_APP_WS_URL=ws://localhost:8080
VITE_APP_BACKEND_URL=http://localhost:3003

# Backend Environment Variables
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/chess?schema=public
NODE_ENV=production
PORT=3003
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ALLOWED_HOSTS=http://localhost:5173
AUTH_REDIRECT_URL=http://localhost:5173/game/random

# Database Environment Variables
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=chess
```

## Docker Images

The following Docker images are available:

- `your-dockerhub-username/chess-frontend`
- `your-dockerhub-username/chess-backend`
- `your-dockerhub-username/chess-ws`

## CI/CD Pipeline

This project uses GitHub Actions for CI/CD:

1. Docker Build and Publish: Builds and pushes Docker images to Docker Hub.
2. Deploy to EC2: Deploys the application to an EC2 instance.

## Architecture

- **Frontend**: React application built with Vite (served by Node.js)
- **Backend**: Express.js API server (running on port 3003)
- **WebSocket Server**: WebSocket server for real-time gameplay (port 8080)
- **Database**: PostgreSQL with Prisma ORM

## License

ISC

## Chess

Building a platform where people can

1. Sign up
2. Create a new match/get connected to an existing match
3. During the match, let users play moves
4. Have a rating system that goes up and down similar to standard chess rating

## Tech stack

Let's keep it simple

1. React for Frontend
2. Node.js for Backend
3. Typescript as the language
4. Separate Websocket servers for handling real time games
5. Redis for storing all moves of a game in a queue

## Setting it up locally

 - Clone the repo
 - Copy over .env.example over to .env everywhere
 - Update .env
    - Postgres DB Credentials
    - Github/Google Auth credentials
 - npm install
 - Start ws server
    - cd apps/ws
    - npm run dev
 - Start Backend
    - cd apps/backend
    - npm run dev
 - Start frontend
    - cd apps/frontend
    - npm run dev

