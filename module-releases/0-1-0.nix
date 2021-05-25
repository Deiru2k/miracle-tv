{ lib, pkgs, config, ... }:

with lib;
let
  cfg = config.services.miracle-tv;
  miracleSrc = pkgs.fetchgit {
    url = "https://code.gensokyo.social/Gensokyo.social/miracle-tv.git";
    rev = "6377e85225ae8e9c9b4e3fcfb808b3244f83f144";
    sha256 = "0cx36likn6kh3bclm76wz6c0kxihxq8afm8hphrfnq2nacr0vsvf";
  };
  miracle-tv = (import "${miracleSrc}/default.nix");
in {
  options.services.miracle-tv = {
    enable = mkEnableOption "Miracle TV server";
    settings = {
      name = mkOption {
        type = types.str;
        default = "MiracleTV";
      };
      server = {
        hostname = mkOption {
          type = types.str;
          default = "0.0.0.0";
        };
        port = mkOption {
          type = types.int;
          default = 4000;
        };
      };
      database = {
        host = mkOption {
          type = types.str;
          default = "localhost";
        };
        port = mkOption {
          type = types.int;
          default = 28015;
        };
        db = mkOption {
          type = types.str;
          default = "miracle-tv";
        };
      };
    };
  };

  config = let
    configFile = pkgs.writeText "config.json" (builtins.toJSON cfg.settings);
  in lib.mkIf cfg.enable {
    systemd.services.miracle-tv = {
      wantedBy = [ "multi-user.target" ];
      serviceConfig.ExecStart = "${miracle-tv}/bin/miracle-tv ${configFile}";
    };
  };
}
