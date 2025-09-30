FROM node:18-alpine AS dependencies
WORKDIR /app
COPY app/package.json app/package-lock.json ./
RUN npm install

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=development
ENV PORT=3000
COPY --from=dependencies /app/node_modules ./node_modules
COPY app/package.json app/package-lock.json ./
COPY app/ .
EXPOSE 3000
CMD ["npm", "run", "dev"]
