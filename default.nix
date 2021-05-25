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
  yarnNix = "${src}/yarn.nix";

  configurePhase = ''
    ln -s $node_modules ./node_modules
  '';

  buildPhase = ''
    $node_modules/.bin/tsc -p .
  '';

  installPhase = ''
    mkdir $out
    mkdir -p $out/node_modules
    cp -r $node_modules/* $out/node_modules
    cp -r src $out/src
    mkdir -p $out/graphql/schema
    cp -r src/graphql/schema/* $out/graphql/schema
    cp tsconfig.json $out/tsconfig.json
    cp package.json $out/package.json
    makeWrapper ${yarnPkg}/bin/yarn $out/bin/${name} \
      --add-flags "--cwd $out" \
      --add-flags server \
      --set node_modules $node_modules \
      --set NODE_PATH $NODE_PATH:$node_modules
    makeWrapper ${yarnPkg}/bin/yarn $out/bin/${name}-start \
      --add-flags "--cwd $out" \
      --add-flags daemon:start \
      --set node_modules $node_modules \
      --set NODE_PATH $NODE_PATH:$node_modules
    makeWrapper ${yarnPkg}/bin/yarn $out/bin/${name}-stop \
      --add-flags "--cwd $out" \
      --add-flags daemon:stop \
      --set node_modules $node_modules \
      --set NODE_PATH $NODE_PATH:$node_modules
    makeWrapper ${yarnPkg}/bin/yarn $out/bin/${name}-restart \
      --add-flags "--cwd $out" \
      --add-flags daemon:restart \
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
