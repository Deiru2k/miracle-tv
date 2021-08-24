# syntax=docker/dockerfile:1
FROM node:12-alpine
RUN apk add --no-cache python g++ make
WORKDIR /app
COPY . .
RUN yarn install
RUN NEXT_PUBLIC_API_URL=http://localhost:1337/api/graphql yarn build:client:docker
EXPOSE 3000
CMD yarn run:client

