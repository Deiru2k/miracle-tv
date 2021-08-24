{ lib, pkgs, config, ... }:

with lib;
let
  cfg = config.services.miracle-tv;
  miracleSrc = ./.;
  miracle-tv = (import "${miracleSrc}/default.nix");
in {
  options.services.miracle-tv = {
    enable = mkEnableOption "Miracle TV server";
    settings = {
      nodeEnv = mkOption {
        type = types.str;
        default = "production";
      };
      name = mkOption {
        type = types.str;
        default = "MiracleTV";
      };
      dataDir = mkOption {
        type = types.str;
        default = "/var/miracle-tv";
      };
      enableNginx = mkEnableOption "Enable Nginx Management";
      url = mkOption {
        type = types.str;
        default = "localhost";
      };
      client = {
        hostname = mkOption {
          type = types.str;
          default = "0.0.0.0";
        };
        port = mkOption {
          type = types.int;
          default = 4000;
        };
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
    services.nginx.virtualHosts = lib.mkIf cfg.settings.enableNginx {
      "${cfg.settings.url}" = {
        enableACME = true;
        forceSSL = true;
        locations."/" = {
          proxyPass = "http://localhost:${toString cfg.settings.client.port}/";
          extraConfig = ''
            proxy_pass_request_headers on;
          '';
        };
        locations."/media" = {
          root = "${cfg.settings.dataDir}";
        };
        locations."/api/" = {
          proxyPass = "http://localhost:${toString cfg.settings.server.port}/";
          extraConfig = ''
            proxy_pass_request_headers on;
          '';
        };
      };
    };
    systemd.services.miracle-tv = {
      wantedBy = [ "multi-user.target" ];
      serviceConfig.ExecStart = "${miracle-tv}/bin/server ${configFile}";
      environment = {
        NODE_ENV = cfg.settings.nodeEnv;
      };
    };
    systemd.services.miracle-tv-frontend = {
      wantedBy = [ "multi-user.target" ];
      serviceConfig.ExecStart = "${miracle-tv}/bin/client -p ${toString cfg.settings.client.port} -H ${cfg.settings.client.hostname}";
      environment = {
        NEXT_PUBLIC_API_URL = "https://${cfg.settings.url}/api/graphql";
        NODE_ENV = cfg.settings.nodeEnv;
      };
    };
  };
}
