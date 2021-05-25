{ lib, pkgs, config, ... }:

with lib;
let
  cfg = config.services.miracle-tv;
  miracleSrc = pkgs.fetchgit {
    url = "https://code.gensokyo.social/Gensokyo.social/miracle-tv.git";
    rev = "163d16f84af91d95713d153da401ec646fe65311";
    sha256 = "1p5134yavwpp938c0pb7qgclv7gg034679gx9jkrxx6rlmvpwhws";
  };
  miracle-tv = (import "${miracleSrc}/default.nix");
in {
  options.services.miracle-tv = {
    enable = mkEnableOption "Enable Miracle TV server";
    settings = {
      name = mkOption {
        type = types.str;
        default = "Miracle TV";
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
