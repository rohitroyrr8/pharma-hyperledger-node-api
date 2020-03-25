FROM node:10.13.0-alpine

# Create Directory for the Container
WORKDIR /usr/src/app

# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN npm install grpc
RUn npm update
RUN npm install

# Copy all other source code to work directory
ADD . /usr/src/app

# Compile the complete project
RUN npm run build

# Start
CMD [ "node", "dist/app.js" ]

EXPOSE 3000