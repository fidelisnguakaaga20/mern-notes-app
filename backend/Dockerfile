# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY backend .

# Set working directory to src to run server.js
WORKDIR /app/src

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
