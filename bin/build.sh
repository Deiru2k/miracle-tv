#! /usr/bin/env sh

rm -rf ./dist
tsc
ls ./src/graphql
cp -r src/graphql/schema dist/graphql/schema
