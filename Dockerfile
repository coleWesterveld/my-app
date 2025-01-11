# Step 1: Use a Node.js image to build the app
FROM node:18 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and lock file
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the app's source code
COPY . .

# Build the React app
RUN yarn build

# Step 2: Use a lightweight web server to serve the built app
FROM nginx:alpine

# Copy the built app from the previous stage to the Nginx web server
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to allow access to the app
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]


# If we run into it, this was from GPT: 

#     6. Optional: Use Docker Compose
# If your app has multiple services (e.g., a backend API, database), you can use Docker Compose. Create a docker-compose.yml file:

# version: '3.8'
# services:
#   react-app:
#     build:
#       context: .
#       dockerfile: Dockerfile
#     ports:
#       - "3000:80"
#     restart: always

# Run with:
    
# docker-compose up