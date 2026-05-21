FROM node:20-alpine AS base
RUN corepack enable && corepack prepare yarn@1.22.21 --activate
WORKDIR /app

FROM base AS deps
COPY package.json yarn.lock turbo.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/tailwind-Config/package.json ./packages/tailwind-Config/
COPY packages/store/package.json ./packages/store/
COPY packages/ui/package.json ./packages/ui/
RUN yarn install --frozen-lockfile --network-timeout 300000

FROM deps AS builder
COPY packages ./packages
COPY apps/frontend ./apps/frontend
# Build args become VITE_ env vars at build time
ARG VITE_APP_WS_URL=ws://localhost:8080
ARG VITE_APP_BACKEND_URL=http://localhost:3000
ENV VITE_APP_WS_URL=$VITE_APP_WS_URL
ENV VITE_APP_BACKEND_URL=$VITE_APP_BACKEND_URL
RUN cd apps/frontend && npx vite build

FROM nginx:1.27-alpine AS runner
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
