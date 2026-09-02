# Base stage: install dependencies
FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

# Production stage using Distroless Node.js
FROM gcr.io/distroless/nodejs18-debian12

WORKDIR /app

COPY --from=base /app ./

EXPOSE 5000

CMD ["server.js"]