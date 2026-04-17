FROM node:20-slim

# Install Chromium and dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    fonts-freefont-ttf \
    fonts-noto-color-emoji \
    libnss3 \
    libatk-bridge2.0-0 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    ca-certificates \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Use system chromium, skip Puppeteer's bundled download
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

COPY . .

# Build frontend in its own directory (bypass workspace hoisting)
WORKDIR /app/packages/frontend
RUN NODE_ENV=development npm install --include=dev
RUN npm run build

# Build backend in its own directory
WORKDIR /app/packages/backend
RUN npm install --omit=dev
RUN npm run build

WORKDIR /app

ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "packages/backend/src/index.js"]
