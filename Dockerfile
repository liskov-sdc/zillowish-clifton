FROM node:10.15.2-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm install -g nodemon
CMD [ "npm", "start" ]
