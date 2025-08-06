# Use Node.js base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy only package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Set working directory to src to run server.js
WORKDIR /app/src

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
