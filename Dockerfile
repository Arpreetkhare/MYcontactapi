# Use the official Node.js image from Docker Hub
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5001 (defined in .env)
EXPOSE 5001

# Start the app
CMD ["npm", "start"]
