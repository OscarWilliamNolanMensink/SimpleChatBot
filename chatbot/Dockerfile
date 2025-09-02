# --- Build stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# Only copy manifests first for better layer caching
COPY package*.json ./
RUN npm ci

# Now bring in the rest and build
COPY . .
RUN npm run build

# --- Run stage ---
FROM nginx:alpine

# SPA-friendly nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ship compiled assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional healthcheck
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
