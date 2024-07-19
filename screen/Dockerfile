# Use an official Node.js runtime as the base image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /screen

# Copy package.json and package-lock.json to the container
COPY screen/package*.json ./

# Install project dependencies
RUN npm install \
    && npm install -g serve
        
# Copy the entire project to the container
COPY screen .

# Build the React app
RUN npm run build \
    && rm -fr node_modules

# Expose the port on which the app will run
EXPOSE 3000

# Run the app
CMD [ "serve", "-s", "build" ]

# Restart browser
RUN chromium-browser http://localhost:3000 \
    && killall chromium-browser \
    && chromium-browser http://localhost:3000