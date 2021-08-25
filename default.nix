with import <nixpkgs> {};

let
  version = "0.1.6";
  src = ./.;
  nodePkg = pkgs.nodejs-14_x;
  yarnPkg = pkgs.yarn.override { nodejs = nodePkg; };
  nodeBcrypt = (builtins.fetchTarball "https://github.com/kelektiv/node.bcrypt.js/releases/download/v5.0.1/bcrypt_lib-v5.0.1-napi-v3-linux-x64-glibc.tar.gz");
in mkYarnPackage rec {
  name = "miracle-tv";
  inherit version src nodePkg yarnPkg;

  doDist = false;
  packageJSON = "${src}/package.json";
  yarnLock = "${src}/yarn.lock";

  configurePhase = ''
    runHook preConfigure

    # Re-create node_modules and place native dependencies there
    rm -rf ./node_modules

    # bcrypt
    mkdir -p ./node_modules/bcrypt/lib/binding/napi-v3
    cp ${nodeBcrypt}/bcrypt_lib.node ./node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node

    # Copy node modules for the buildPhase
    cp -R $node_modules/* ./node_modules
    cp -R $node_modules/.bin ./node_modules

    runHook preConfigure
  '';

  buildPhase = ''
    runHook preBuild

    # Build server and client
    yarn --offline build:server
    yarn --offline build:client

    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall

    # Create output dirs
    mkdir -p $out/bin
    mkdir -p $out/dist/server/graphql
    mkdir -p $out/dist/server/lib/binding/napi-v3

    # Copy files needed for the suite to run
    cp package.json $out/package.json
    cp next.config.js $out/next.config.js
    cp tsconfig.json $out/tsconfig.json
    cp next.config.js $out/next.config.js

    # Copy server dist
    cp -r ./dist/server/* $out/dist/server
    cp -r ./src/server/graphql/schema/* $out/dist/server/graphql

    # Wrap yarn to run server as `miracle-server`
    makeWrapper $yarnPkg/bin/yarn $out/bin/miracle-server \
      --add-flags "--cwd $out" \
      --add-flags "run:server" \
      --set NODE_ENV production

    # Copy client dist
    mkdir -p $out/dist/client
    cp -R ./dist/client/* $out/dist/client

    # Wrap yarn to run client as `miracle-client`
    makeWrapper $yarnPkg/bin/yarn $out/bin/miracle-client \
      --add-flags "--cwd $out" \
      --add-flags "run:client" \
      --set NODE_PATH "$node_modules" \
      --set PATH "$PATH:$node_modules/.bin" \
      --set NODE_ENV production

    runHook preInstall
  '';

  distPhase = ''
    true
  '';

  nativeBuildInputs = with pkgs; [
    nodePkg yarnPkg makeWrapper
    automake autoconf m4 git bash
    libpng libGL gcc yarn2nix
  ];
}
