with import <nixpkgs> {};

let
  version = "0.1.1";
  src = ./.;
  nodePkg = pkgs.nodejs-14_x;
  yarnPkg = pkgs.yarn.override { nodejs = nodePkg; };
  packages = (import ./packages.nix);
in pkgs.stdenv.mkDerivation rec {
  name = "miracle-tv";
  inherit version src nodePkg yarnPkg;

  doDist = false;

  configurePhase = ''
    rm -rf ./node_modules || true
    mkdir -p ./node_modules/.bin
    cp -r ${packages}/modules/* ./node_modules
    cp -r ${packages}/modules/.bin/* ./node_modules/.bin
  '';

  buildPhase = ''
    ./node_modules/.bin/tsc
  '';

  installPhase = ''
    mkdir $out
    cp -r ./dist/* $out
    cp tsconfig.json $out/tsconfig.json

    makeWrapper ${nodePkg}/bin/node $out/bin/${name} \
      --set TS_NODE_PROJECT $out/tsconfig.json \
      --add-flags '-r ts-node/register/transpile-only' \
      --add-flags '-r tsconfig-paths/register' \
      --add-flags $out/server.js \
      --set NODE_PATH $NODE_PATH:$out:${packages}/modules
  '';

  distPhase = ''
    true
  '';

  nativeBuildInputs = with pkgs; [
    nodePkg yarnPkg makeWrapper
    automake autoconf m4 git bash
    libpng libGL gcc yarn2nix packages
  ];
}
