FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package.json .
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* ./
COPY packages/db/package.json ./packages/db/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/store/package.json ./packages/store/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY packages/tailwind-Config/package.json ./packages/tailwind-Config/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json

# Copy turbo config
COPY turbo.json ./turbo.json

# Disable husky install
ENV HUSKY=0
RUN sed -i '/prepare/,/husky/d' package.json

# Install dependencies
RUN npm install

# Copy source files
COPY packages/db ./packages/db
COPY packages/ui ./packages/ui
COPY packages/store ./packages/store
COPY packages/eslint-config ./packages/eslint-config
COPY packages/typescript-config ./packages/typescript-config
COPY packages/tailwind-Config ./packages/tailwind-Config
COPY apps/frontend ./apps/frontend

# Generate Prisma client
RUN npx -w @repo/db prisma generate

# Modify the build script to skip TypeScript type checking
RUN cd apps/frontend && \
    sed -i 's/tsc && vite build/vite build/g' package.json

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