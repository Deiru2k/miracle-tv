with import <nixpkgs> {};

let
  version = "0.1.1";
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
    ln -s $node_modules ./node_modules
  '';

  buildPhase = ''
    NODE_ENV=production $node_modules/.bin/ncc build src/server.ts -o ./dist/server
  '';

  installPhase = ''
    mkdir -p $out/server/graphql
    cp -R ./dist/server/* $out/server/
    cp -R src/graphql/schema/* $out/server/graphql/
    makeWrapper ${nodePkg}/bin/node $out/bin/${name} \
      --add-flags "$out/server/index.js" \
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
