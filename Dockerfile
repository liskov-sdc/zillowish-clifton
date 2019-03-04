
FROM alpine:latest

RUN apk add --no-cache nodejs npm

# Set the working directory to /app
WORKDIR /app
# Copy the current directory contents into the container at /app

COPY . /app


# Install any needed packages specified in requirements.txt
RUN npm install


# Make port 80 available to the world outside this container
EXPOSE 8082


ENTRYPOINT [ "node" ]

CMD [ "server.js" ]