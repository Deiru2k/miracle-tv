# MiracleTV
#### A Streaming Suite

Server part of MiracleTV Suite


[![Support Server](https://img.shields.io/discord/836657856325353492.svg?logo=Discord&label=Gensokyo.social&colorB=7289da&style=for-the-badge)](https://gensokyo.social/discord)

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


# Deploying in Production with nix
### ! Software does not include migrations and is definetely not production ready, deploy at your own risk !
Download one of our [module-releases](./module-releases/) files and import it in your configuration.nix, and then configure it like so

``` sh
sudo wget https://code.gensokyo.social/Gensokyo.social/miracle-tv/raw/branch/develop/module-releases/0-1-0-2.nix -P /etc/nixos/miracle-module.nix
```

``` nix
# configuration.nix
{
    imports = [
        # ... your other imports
        ./miracle-module.nix
    ];
    
    # ... your configration.nix
    
    services.miracle-tv = {
        enable = true;
        settings = {
            name = "My MiracleTV instance";
            server = { 
                port = "8080";
            };
        };
    };
}
```


* (Optionally) proxy pass `http://localhost:4000` via web server of your choice. GraphQL Playground will be available at `${yourdomain}/graphql`.


`nixos-rebuild switch` should download and compile everything. Look for full list of options inside the module file.
