FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package.json .
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* ./
COPY packages/db/package.json ./packages/db/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/store/package.json ./packages/store/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json

# Copy turbo config
COPY turbo.json ./turbo.json

# Install dependencies
RUN npm install

# Copy source files
COPY packages/db ./packages/db
COPY packages/ui ./packages/ui
COPY packages/store ./packages/store
COPY apps/frontend ./apps/frontend

# Generate Prisma client
RUN npx -w @repo/db prisma generate

# Build the app
RUN npm run build --workspace=frontend

# Production stage - use a lightweight production image
FROM node:20-alpine

WORKDIR /app

# Install a simple server to serve static files
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/apps/frontend/dist /app/dist

EXPOSE 5100

# Serve the static files
CMD ["serve", "-s", "dist", "-l", "5100"] 