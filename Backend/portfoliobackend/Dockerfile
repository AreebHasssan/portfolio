# Build stage
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Run stage
FROM gcr.io/distroless/nodejs18-debian12
WORKDIR /app
ENV PORT=5000
COPY --from=base /app ./
EXPOSE 5000
CMD ["server.js"]