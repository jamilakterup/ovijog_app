# Stage 1: Build
FROM node:20.5.1

# Set the working directory in the container
WORKDIR /app

# Copy the project files into the working directory

COPY . .

# Install the project dependencies
RUN npm install

# Build the project
RUN npm run build