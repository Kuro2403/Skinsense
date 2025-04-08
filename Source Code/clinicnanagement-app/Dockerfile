# Use an appropriate base image (e.g., node:18.17.1)
FROM node:18.17.1-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY yarn.lock ./

RUN yarn config set registry https://registry.yarnpkg.com

# Install dependencies using Yarn
RUN yarn install 

# Install global packages (if needed)
RUN yarn add react-scripts@5.0.1 

# Copy the rest of the application code
COPY . .

# Specify the startup command
CMD ["yarn", "start"]
