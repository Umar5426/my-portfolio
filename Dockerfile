# Build the existing Next.js portfolio as a static website.
FROM node:22-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY my_portfolio/package.json my_portfolio/package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY my_portfolio/ ./
RUN npm run build:static

# Only the generated website is included in the runtime image.
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out/ /usr/share/nginx/html/
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1
CMD ["nginx", "-g", "daemon off;"]
