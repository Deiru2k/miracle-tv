# syntax=docker/dockerfile:1
FROM node:12-alpine
RUN apk add --no-cache python3 g++ make wget
WORKDIR /app
COPY . .
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install
RUN NEXT_PUBLIC_API_URL=http://localhost:1337/api/graphql yarn build:client:docker
EXPOSE 3000
CMD yarn run:client

