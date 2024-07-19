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

# The "./" is the working directory e.g. /usr/app
USER root
RUN chmod a+w ./ -R

# Close browser
RUN pkill -f chromium-browser

# Later switch back to run rest of commands and container as node non-root user 
USER node

# Expose the port on which the app will run
EXPOSE 3000

# Run the app
CMD [ "serve", "-s", "build" ]
