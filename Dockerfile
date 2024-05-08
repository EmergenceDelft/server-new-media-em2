# Use an official Node.js runtime as the base image
FROM node:latest

# Set working directory in the container, otherwise there are problems with permissions acces for the docker file
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

