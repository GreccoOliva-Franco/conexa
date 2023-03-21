FROM node:lts
# GET ENV VARS FROM environment key of docker-compose.yml
ARG APP_PORT

# Create app directory
WORKDIR /usr/src/app

# copy app dependencies
COPY package*.json ./

# Bundle app source
COPY . .

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install


EXPOSE ${APP_PORT}
CMD [ "npm", "start" ]
