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
    yarn build:client
  '';

  installPhase = ''
    mkdir -p $out/server
    mkdir -p $out/bin
    cp -R ./* $out/
    makeWrapper $out/node_modules/.bin/ts-node $out/bin/server \
      --add-flags "-r tsconfig-paths/register" \
      --add-flags "$out/src/server/server.ts" \
      --set NODE_ENV production \
      --set NODE_PATH $NODE_PATH:$node_modules

    mkdir -p $out/client/dist
    cp -R ./next-production.config.js $out/client/next.config.js
    cp -R ./dist/client/* $out/client/dist
    makeWrapper $out/node_modules/.bin/next $out/bin/client \
      --add-flags "start" \
      --add-flags "$out/client" \
      --set NODE_PATH $out/node_modules:$NODE_PATH
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
