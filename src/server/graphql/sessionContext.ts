import { DateTime } from "luxon";
import { UserAgent } from "express-useragent";

import { getCompleteRights } from "miracle-tv-shared/acl/utils";
import { DbSession, DbUser } from "miracle-tv-server/db/models/types";
import { DBContext, ResolverContext } from "miracle-tv-server/types/resolver";

export const createSessionContext = async (
  token: string,
  userAgentString: string,
  ip: string,
  db: DBContext
) => {
  const isSessionTooLong = token.length > 127;

  const session = isSessionTooLong
    ? null
    : ((await db.sessions.getSessionById(token || "")) as DbSession | null);

  const sessionIsValid =
    DateTime.fromISO(session?.expiresAt).diffNow("seconds").seconds > 0 ||
    false;

  if (sessionIsValid) {
    const ua = new UserAgent().parse(userAgentString);
    const userAgent = `${ua.browser} (${ua.os})`;
    db.sessions.updateSessionInfo(session.id, ip, userAgent);
  }

  const user = sessionIsValid
    ? ((await db.users.getUserById(session?.user)) as DbUser | null)
    : null;

  const isUserInvalid = user?.loginDisabled || user?.suspended || user?.deleted;

  const allRoles = await db.roles.list();

  const userRoles =
    user?.roles?.map((role) =>
      getCompleteRights(allRoles, role as unknown as string)
    ) || [];

  return { session, user: !isUserInvalid ? user : null, userRoles } as Pick<
    ResolverContext,
    "session" | "user" | "userRoles"
  >;
};
