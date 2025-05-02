FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package.json .
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* ./
COPY packages/db/package.json ./packages/db/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY apps/ws/package.json ./apps/ws/package.json

# Copy turbo config
COPY turbo.json ./turbo.json

# Disable husky install
ENV HUSKY=0
RUN sed -i '/prepare/,/husky/d' package.json

# Install dependencies and esbuild
RUN npm install
RUN npm install -g esbuild

# Copy source files
COPY packages/db ./packages/db
COPY packages/eslint-config ./packages/eslint-config
COPY packages/typescript-config ./packages/typescript-config
COPY apps/ws ./apps/ws

# Generate Prisma client
RUN npx -w @repo/db prisma generate

# Create the dist directory
RUN mkdir -p /app/apps/ws/dist

# Build the app manually
RUN cd /app/apps/ws && \
    esbuild ./src/index.ts --bundle --platform=node --outfile=dist/index.js --sourcemap

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files for production
COPY package.json .
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* ./
COPY packages/db/package.json ./packages/db/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY apps/ws/package.json ./apps/ws/package.json

# Disable husky install
ENV HUSKY=0
RUN sed -i '/prepare/,/husky/d' package.json

# Install production dependencies only
RUN npm install --omit=dev

# Copy built files from builder stage
COPY --from=builder /app/apps/ws/dist ./dist
COPY --from=builder /app/packages/db ./packages/db
COPY --from=builder /app/packages/eslint-config ./packages/eslint-config
COPY --from=builder /app/packages/typescript-config ./packages/typescript-config

# Generate Prisma client
RUN npx -w @repo/db prisma generate

EXPOSE 8080

CMD ["node", "dist/index.js"] 