with import <nixpkgs> {};

let
  version = "0.1.5";
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
    rm -rf ./node_modules
    mkdir ./node_modules
    cp -R $node_modules/* ./node_modules
    cp -R $node_modules/.bin ./node_modules
  '';

  buildPhase = ''
    runHook preBuild
    yarn --offline build:server
    yarn --offline build:client
    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall
    mkdir -p $out/bin
    mkdir -p $out/node_modules/bcrypt/lib/binding/napi-v3/
    ls ./
    cp -R ./* $out
    cp -r ${nodeBcrypt}/bcrypt_lib.node $out/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node
    makeWrapper $yarnPkg/bin/yarn $out/bin/miracle-server \
      --add-flags "--cwd $out" \
      --add-flags "run:server" \
      --set NODE_ENV production \
      --set NODE_PATH $NODE_PATH:$node_modules

    makeWrapper $yarnPkg/bin/yarn $out/bin/miracle-client \
      --add-flags "--cwd $out" \
      --add-flags "run:client" \
      --set NODE_ENV production \
      --set NODE_PATH $NODE_PATH:$node_modules
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
