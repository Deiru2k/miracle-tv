import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { changePassword } from "./commands/change-password";
import { fixMatureChannels } from "./commands/fix-mature-channels";
import { fixPasswordProtection } from "./commands/fix-password-protected";
import { fixShelvedChannels } from "./commands/fix-shelved-channels";
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
  .command({
    command: "fix-shelved-channels",
    describe: "Make all channels unshelved",
    handler: fixShelvedChannels,
  })
  .command({
    command: "fix-mature-channels",
    describe: "Make all channels unmarked as mature",
    handler: fixMatureChannels,
  })
  .command({
    command: "fix-password-protection",
    describe: "Remove password protection from all channels",
    handler: fixPasswordProtection,
  })
  .demandCommand()
  .help().argv;
