with import <nixpkgs> {};

let
  version = "0.1.0";
  src = ./nix;
  nodePkg = pkgs.nodejs-14_x;
  yarnPkg = pkgs.yarn.override { nodejs = nodePkg; };
in mkYarnPackage rec {
  name = "miracle-tv-packages";
  inherit version src nodePkg yarnPkg;

  packageJSON = "${src}/package.json";
  yarnLock = "${src}/yarn.lock";
  yarnNix = "${src}/yarn.nix";

  doConfigure = false;
  configurePhase = ''
    true
  '';
  doBuild = false;
  buildPhase = ''
    true
  '';
  doDist = false;
  distPhase = ''
    true
  '';

  installPhase = ''
    mkdir -p $out/modules/.bin
    cp -R $node_modules/* $out/modules
    cp -R $node_modules/.bin/* $out/modules/.bin
  '';
}
