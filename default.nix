with import <nixpkgs> {};

let
  version = "0.1.5";
  src = ./.;
  nodePkg = pkgs.nodejs-14_x;
  yarnPkg = pkgs.yarn.override { nodejs = nodePkg; };
in mkYarnPackage rec {
  name = "miracle-tv";
  inherit version src nodePkg yarnPkg;

  doDist = false;
  packageJSON = "${src}/package.json";
  yarnLock = "${src}/yarn.lock";


  configurePhase = ''
    rm -rf ./node_modules
    mkdir ./node_modules
    cp -R $node_modules/* ./node_modules
    cp -R $node_modules/.bin ./node_modules
  '';

  buildPhase = ''
    yarn build:server
    yarn build:client
  '';

  installPhase = ''
    mkdir -p $out/server
    cp -R ./dist/server/* $out/server/
    mkdir -p $out/server/graphql
    cp -R src/server/graphql/schema/* $out/server/graphql/
    makeWrapper ${nodePkg}/bin/node $out/bin/server \
      --add-flags "$out/server/index.js" \
      --set node_modules $node_modules \
      --set NODE_PATH $NODE_PATH:$node_modules

    mkdir -p $out/client/dist
    cp -R ./next-production.config.js $out/client/next.config.js
    cp -R ./dist/client/* $out/client/dist
    makeWrapper $node_modules/.bin/next $out/bin/client \
      --add-flags "start" \
      --add-flags "$out/client" \
      --set node_modules $node_modules \
      --set NODE_PATH $NODE_PATH:$node_modules
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
