FROM node:alpine3.11
MAINTAINER <GROUP_NAME_HERE>

# Change working directory
WORKDIR /usr/src/app

# Install App Dependencies
COPY package*.json ./
RUN npm install

# Copy App Source
COPY . .
#TODO Run any build scripts here

EXPOSE 80
CMD [ "npm", "start" ]
