# syntax=docker/dockerfile:1
FROM node:14-alpine
RUN apk add --no-cache python3 g++ make
WORKDIR /app
COPY . .
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install
EXPOSE 4000
CMD yarn run:server /conf/config.json

