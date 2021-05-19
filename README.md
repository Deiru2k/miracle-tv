# MiracleTV
#### A Streaming Suite

Server part of MiracleTV Suite

## Running requirements
- NodeJS 14>
- Yarn
- RethinkDB 2.4.1>

## Development Requirements
- Nix (Strongly encouraged, but optional)
- NodeJS 14>
- Yarn
- RethinkDB 2.4.1>

## Building and running
### Non-nix
- `yarn`
- `./bin/build.sh`
- `nodejs -r ts-node/register/transpile-only -r tsconfig-paths/register dist/server.js`

## Nix
- `nix-env -f default.nix`
- `miracle-tv`

## Development
### Non-nix
- `yarn`
- `yarn dev`

### Nix
- `nix-shell`
- `yarn-dev`

GraphQL schemas, resolvers and mutations can be found in `src/graphql`.
GraphiQL for testing is available over at `http://localhost:4000/graphql` for testing.

### Before commit
Before commiting, if you have altered packages installed for the project, please regenerate `nix/yarn.nix` using `yarn2nix` and copy `package.json` and `yarn.lock` to `/nix` folder as well. This is to make sure changes to the code and not the dependecies do not trigger extra rebuilds.
If you don't use nix, please reach out to somebody who can do that for you.
