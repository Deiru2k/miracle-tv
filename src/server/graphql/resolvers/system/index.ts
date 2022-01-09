import { cpu, mem, drive, netstat, NetStatMetrics } from "node-os-utils";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { QueryResolvers } from "miracle-tv-shared/graphql";
import config from "miracle-tv-server/config";
import { dirSize } from "src/cli/commands/stats";

export const systemResolvers: QueryResolvers<ResolverContext> = {
  async userStats(_, __, { db: { users, channels, streamKeys, sessions } }) {
    const userCount = await users.table
      .filter({ disabled: false, suspended: false })
      .count()
      .run(users.conn);
    const channelCount = await channels.table.count().run(users.conn);
    const streamKeyCount = await streamKeys.table.count().run(users.conn);
    const sessionCount = await sessions.table.count().run(users.conn);

    return {
      userCount,
      channelCount,
      streamKeyCount,
      sessionCount,
    };
  },
  async systemLoad(_, __, { db: { system } }) {
    const cpuPercentage = await cpu.usage();
    const memory = await mem.used();
    const disk = await (drive.used as any)();
    const memPercentage = Number(
      ((100 * memory.usedMemMb) / memory.totalMemMb).toFixed(1)
    );
    const mediaDirSize = await dirSize(`${config.dataDir}/media`);
    const dbSize = await system.getDbSize();
    const networkUpDown = (await netstat.inOut()) as NetStatMetrics;

    return {
      cpuPercentage,
      usedMem: memory.usedMemMb,
      totalMem: memory.totalMemMb,
      memPercentage: memPercentage,
      usedDrive: disk.usedGb,
      totalDrive: disk.totalGb,
      drivePercentage: disk.usedPercentage,
      mediaDirSize: mediaDirSize / (1000 * 1000 * 1000),
      dbSize: dbSize / (1000 * 1000 * 1000),
      networkDown: networkUpDown.total.inputMb,
      networkUp: networkUpDown.total.outputMb,
    };
  },
};
