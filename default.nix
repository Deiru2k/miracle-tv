with import <nixpkgs> {};

let
  executableName = "miracle-tv";
  version = "0.1.0";
  src = ./.;
  nodePkg = pkgs.nodejs-14_x;
  yarnPkg = pkgs.yarn.override { nodejs = nodePkg; };
in mkYarnPackage rec {
  name = "miarcle-tv";
  inherit version src nodePkg yarnPkg;

  doDist = false;

  packageJSON = "${src}/package.json";
  yarnLock = "${src}/yarn.lock";
  yarnNix = "${src}/yarn.nix";

  configurePhase = ''
    rm -rf ./node_modules || true
    ln -s $node_modules ./node_modules
  '';

  buildPhase = ''
    sh ./bin/build.sh
  '';

  installPhase = ''
    mkdir $out
    cp -R ./dist/* $out
    cp -R ./migrations $out/migrations
  '';

  distPhase = ''
    true
  '';

  nativeBuildInputs = with pkgs; [
    nodePkg yarnPkg makeWrapper
    automake autoconf m4 git bash
    libpng libGL gcc
  ];
}
