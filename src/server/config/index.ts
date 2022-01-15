import { readFileSync } from "fs";
import defaultConfig from "./local.json";

export type DBConfig = {
  host?: string;
  port?: number;
  db?: string;
};

export type ServerConfig = {
  hostname?: string;
  port?: number;
};

export type Config = {
  name?: string;
  domain?: string;
  dataDir?: string;
  pathPrefix?: string;
  server?: ServerConfig;
  database?: DBConfig;
  omeEnabled?: boolean;
  omeAPIUrl?: string;
  publishUrl?: string;
};

export const getConfig = (configPath?: string): Config => {
  const trueConfigPath = configPath || (process.env.MIRACLE_CONFIG as string);
  if (trueConfigPath) {
    const config = JSON.parse(
      readFileSync(trueConfigPath).toString()
    ) as Config;
    return { ...(defaultConfig as Config), ...config };
  }
  return defaultConfig as Config;
};

export default getConfig();
