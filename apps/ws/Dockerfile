FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package.json .
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* ./
COPY packages/db/package.json ./packages/db/package.json
COPY apps/ws/package.json ./apps/ws/package.json

# Copy turbo config
COPY turbo.json ./turbo.json

# Install dependencies
RUN npm install

# Copy source files
COPY packages/db ./packages/db
COPY apps/ws ./apps/ws

# Generate Prisma client
RUN npx -w @repo/db prisma generate

# Build the app
RUN npm run dev --workspace=backend1

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files for production
COPY package.json .
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* ./
COPY packages/db/package.json ./packages/db/package.json
COPY apps/ws/package.json ./apps/ws/package.json

# Install production dependencies only
RUN npm ci --omit=dev

# Copy built files from builder stage
COPY --from=builder /app/apps/ws/dist ./dist
COPY --from=builder /app/packages/db ./packages/db

# Generate Prisma client
RUN npx -w @repo/db prisma generate

EXPOSE 8080

CMD ["node", "dist/index.js"] 