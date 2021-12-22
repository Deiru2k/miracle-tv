{ pkgs ? import <nixpkgs> {} }:

with pkgs;

let
  miraclePkg = (import ./default.nix);
  src = ./.;
in mkShell {
  shellHook = ''
    export PATH=$PATH:$(pwd)/node_modules/.bin
    export node_modules=$(pwd)/node_modules
    export API_URL=http://localhost:4000/graphql
    yarn
  '';
  buildInputs = [
    miraclePkg.nodePkg miraclePkg.yarnPkg makeWrapper
    automake autoconf m4 git bash
    libpng libGL gcc yarn2nix
  ];
}
