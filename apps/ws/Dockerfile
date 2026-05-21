FROM node:20-slim AS base
RUN corepack enable && corepack prepare yarn@1.22.21 --activate
WORKDIR /app

FROM base AS deps
COPY package.json yarn.lock turbo.json ./
COPY apps/ws/package.json ./apps/ws/
COPY packages/db/package.json ./packages/db/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/
RUN yarn install --frozen-lockfile --network-timeout 300000

FROM deps AS builder
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
COPY packages/db ./packages/db
COPY apps/ws ./apps/ws
RUN cd packages/db && npx prisma generate
RUN npx esbuild ./apps/ws/src/index.ts --bundle --platform=node --outfile=apps/ws/dist/index.js \
    --external:@prisma/client --external:.prisma/client

FROM node:20-slim AS runner
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
WORKDIR /app

COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/packages/db/node_modules ./packages/db/node_modules
COPY --from=builder --chown=appuser:appgroup /app/apps/ws/dist ./apps/ws/dist
COPY --from=builder --chown=appuser:appgroup /app/packages/db/prisma ./packages/db/prisma

USER appuser
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "apps/ws/dist/index.js"]
