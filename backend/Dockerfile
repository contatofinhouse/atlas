# Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production Stage
FROM node:22-alpine AS runner

WORKDIR /app

# Install LibreOffice and other dependencies for document conversion
# We use alpine so we can add libreoffice via apk
RUN apk add --no-cache \
    libreoffice \
    ttf-dejavu \
    ttf-liberation \
    fontconfig

ENV NODE_ENV production

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/index.js"]
