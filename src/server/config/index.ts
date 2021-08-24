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
};

export const getConfig = (): Config => {
  const args = process.argv.slice(2);
  const configPath = args[0];
  if (configPath) {
    const config = JSON.parse(readFileSync(configPath).toString()) as Config;
    return { ...(defaultConfig as Config), ...config };
  }
  return defaultConfig as Config;
};

export default getConfig();
