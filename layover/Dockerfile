FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the requested port
EXPOSE 2525

# Start the Vite development server on port 2525
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "2525"]
