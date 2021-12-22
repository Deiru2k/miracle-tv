import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { changePassword } from "./commands/change-password";
import { getDbStats } from "./commands/stats";

yargs(hideBin(process.argv))
  .scriptName("miracle-ctl")
  .version()
  .command({
    command: "change-password <username> <password>",
    describe: "Change password for a specific user",
    handler: changePassword,
  })
  .command({
    command: "stats",
    describe: "Get statistics for database in use",
    handler: getDbStats,
  })
  .demandCommand()
  .help().argv;
