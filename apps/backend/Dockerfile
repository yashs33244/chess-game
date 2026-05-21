FROM node:20-slim AS base
RUN corepack enable && corepack prepare yarn@1.22.21 --activate
WORKDIR /app

FROM base AS deps
COPY package.json yarn.lock turbo.json ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/db/package.json ./packages/db/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/
RUN yarn install --frozen-lockfile --network-timeout 300000

FROM deps AS builder
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
COPY packages/db ./packages/db
COPY apps/backend ./apps/backend
RUN cd packages/db && npx prisma generate
RUN cd apps/backend && npx esbuild src/index.ts --bundle --platform=node --outfile=dist/index.js \
    --external:@prisma/client --external:.prisma/client

FROM node:20-slim AS runner
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
WORKDIR /app

COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/packages/db/node_modules ./packages/db/node_modules
COPY --from=builder --chown=appuser:appgroup /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder --chown=appuser:appgroup /app/packages/db/prisma ./packages/db/prisma
COPY --chown=appuser:appgroup apps/backend/entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh

USER appuser
ENV NODE_ENV=production
EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]
