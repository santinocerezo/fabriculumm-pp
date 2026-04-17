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

# Copy package files first for better caching
COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/
COPY packages/backend/package*.json ./packages/backend/

# Force NODE_ENV=development for this RUN only so devDeps (Vite, Tailwind) install correctly
RUN NODE_ENV=development npm install --include=dev

# Copy rest of the source
COPY . .

# Build frontend + backend
RUN npm run build:frontend && npm run build:backend

# NODE_ENV production only after build — so Express serves the dist frontend
ENV NODE_ENV=production

EXPOSE 3001

CMD ["npm", "run", "start:backend"]
