import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { changePassword } from "./commands/change-password";
import { fixUserFlags } from "./commands/fix-user-flags";
import { makeAdmin } from "./commands/make-admin";
import { regenerateRoles } from "./commands/regenerate-roles";
import { getDbStats } from "./commands/stats";

yargs(hideBin(process.argv))
  .scriptName("miracle-ctl")
  .version()
  .command({
    command: "change-password <username> <password>",
    describe: "Change password for a specific user",
    handler: changePassword as any,
  })
  .command({
    command: "make-admin <username>",
    describe: "Make a specific user an instance-wide admin",
    handler: makeAdmin as any,
  })
  .command({
    command: "stats",
    describe: "Get statistics for database in use",
    handler: getDbStats,
  })
  .command({
    command: "regenerate-roles",
    describe: "Regenerate system roles",
    handler: regenerateRoles,
  })
  .command({
    command: "fix-user-flags",
    describe: "Fix missing on users",
    handler: fixUserFlags,
  })
  .demandCommand()
  .help().argv;
