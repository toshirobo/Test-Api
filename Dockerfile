# Dockerfile

# Base image
FROM node:20-bullseye-slim

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all source code
COPY . .

# Expose port
EXPOSE 10000

# Environment variable fallback
ENV PORT=10000

# Start command
CMD ["node", "index.js"]
