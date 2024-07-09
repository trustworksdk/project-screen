# Use an official Node.js runtime as the base image
FROM node:lts-alpine

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install \
&& npm install -g serve

# Copy the entire project to the container
COPY . .

# Build the React app
RUN npm run build \
    && rm -fr node_modules

# Expose the port on which the app will run
EXPOSE 3000

# Define the command to run the app
# CMD ["npm", "start"]
CMD [ "serve", "-s", "build" ]
