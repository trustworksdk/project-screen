# Stage 1: Build the React app
FROM node:lts-alpine as react-build

WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app with NGINX
FROM nginx:latest

# Copy custom NGINX config
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy the build output from the react-build stage to NGINX html directory
COPY --from=react-build /app/build /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
