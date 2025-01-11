FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application
COPY . .

# Expose the development server's port
EXPOSE 3000

# Start the React development server
CMD ["yarn", "start"]
