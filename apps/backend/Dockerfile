FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package.json .
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* ./
COPY packages/db/package.json ./packages/db/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY apps/backend/package.json ./apps/backend/package.json

# Copy turbo config
COPY turbo.json ./turbo.json

# Disable husky install
ENV HUSKY=0
RUN sed -i '/prepare/,/husky/d' package.json

# Install dependencies
RUN npm install

# Copy source files
COPY packages/db ./packages/db
COPY packages/eslint-config ./packages/eslint-config
COPY packages/typescript-config ./packages/typescript-config
COPY apps/backend ./apps/backend

# Generate Prisma client
RUN npx -w @repo/db prisma generate

# Build the app
RUN npm run build --workspace=backend

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files for production
COPY package.json .
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* ./
COPY packages/db/package.json ./packages/db/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY apps/backend/package.json ./apps/backend/package.json

# Disable husky install
ENV HUSKY=0
RUN sed -i '/prepare/,/husky/d' package.json

# Install production dependencies only
RUN npm install --omit=dev

# Copy built files from builder stage
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/packages/db ./packages/db
COPY --from=builder /app/packages/eslint-config ./packages/eslint-config
COPY --from=builder /app/packages/typescript-config ./packages/typescript-config

# Generate Prisma client
RUN npx -w @repo/db prisma generate

EXPOSE 3003

CMD ["node", "dist/index.js"] 