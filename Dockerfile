FROM node:18-alpine AS dependencies
WORKDIR /app
COPY app/package.json app/package-lock.json ./
RUN npm ci


FROM node:18-alpine AS builder
WORKDIR /app
ARG BUILD_MODE=production
ENV BUILD_MODE=$BUILD_MODE
COPY --from=dependencies /app/node_modules ./node_modules
COPY app/ .
RUN if [ "$BUILD_MODE" = "production" ]; then npm run build; fi


FROM node:18-alpine AS runner
WORKDIR /app
ENV APP_MODE=${APP_MODE:-production}
ENV PORT=3000
COPY --from=dependencies /app/node_modules ./node_modules
COPY app/package.json app/package-lock.json ./
RUN if [ "$APP_MODE" != "production" ]; then npm install; fi
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
EXPOSE 3000
CMD if [ "$APP_MODE" = "production" ]; then npm start; else npm run dev; fi
