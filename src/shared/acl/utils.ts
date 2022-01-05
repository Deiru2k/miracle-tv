import {
  AccessRights,
  AccessUnit,
  Role,
  UserActions,
} from "miracle-tv-shared/graphql";
import { pathOr } from "ramda";
import { any, flatten, identity, lensPath, view } from "ramda";

type RowMap = Record<string, Role>;

const fetchAccess = (
  roles: RowMap,
  targetRole: keyof RowMap,
  target: keyof Role["access"]["rights"]
): AccessUnit[] => {
  const currentAccessPath = [targetRole, "access", "rights", target];
  const currentParentPath = [targetRole, "parentId"];
  const access: AccessUnit[] = pathOr(
    [AccessUnit.Inherit],
    currentAccessPath,
    roles
  );
  const parent: keyof RowMap = pathOr(null, currentParentPath, roles);
  if (access === [AccessUnit.Inherit] && !parent) {
    return [AccessUnit.Deny];
  } else if (access !== [AccessUnit.Inherit]) {
    return access;
  }
  return fetchAccess(roles, parent, target);
};

const fetchActions = (
  roles: RowMap,
  targetRole: keyof RowMap,
  target: Array<string>
): boolean => {
  const currentAccessPath = [targetRole, "access", "actions"].concat(target);
  const currentParentPath = [targetRole, "parentId"];

  const access: boolean = pathOr(false, currentAccessPath, roles);
  const parent: keyof RowMap = pathOr(null, currentParentPath, roles);

  if (access || !parent) {
    return access;
  }
  return fetchActions(roles, parent, target);
};

export const getCompleteRights = (roles: Role[], target: Role["id"]): Role => {
  const rolesById: RowMap = roles.reduce(
    (acc, role) => ({ ...acc, [role.id]: role }),
    {}
  );

  const endRole: Role = {
    id: target,
    name: rolesById[target].name,
    access: {
      rights: {
        users: fetchAccess(rolesById, target, "users"),
        roles: fetchAccess(rolesById, target, "roles"),
        streamKeys: fetchAccess(rolesById, target, "streamKeys"),
        channels: fetchAccess(rolesById, target, "channels"),
        activities: fetchAccess(rolesById, target, "activities"),
        userSettings: fetchAccess(rolesById, target, "userSettings"),
      },
      actions: {
        user: {
          ban: fetchActions(rolesById, target, ["user", "ban"]),
          silence: fetchActions(rolesById, target, ["user", "silence"]),
          warn: fetchActions(rolesById, target, ["user", "warn"]),
        },
      },
    },
  };

  return endRole;
};

export const checkRight = (
  roles: Role[],
  unit: AccessUnit,
  subject: string
) => {
  console.log(subject);
  const channelEditRightsLens = lensPath(["access", "rights", subject]);
  return any((right: AccessUnit[]) => {
    console.log(right);
    return right.includes(unit);
  }, roles.map(view(channelEditRightsLens)));
};

const adminWritePermissions: Array<keyof AccessRights> = [
  "channels",
  "streamKeys",
  "roles",
  "users",
  "activities",
];

const adminUserActionPermissions: Array<keyof UserActions> = [
  "silence",
  "ban",
  "warn",
];

export const hasAdminPanelAccess = (userRoles: Role[]) => {
  return any(
    identity,
    userRoles.map((role) => {
      const hasRequiredPermission = any(
        identity,
        flatten(
          (Object.keys(role.access.rights) as Array<keyof AccessRights>).map(
            (key) => {
              return (
                adminWritePermissions.includes(key) &&
                role.access.rights[key].includes(AccessUnit.Write)
              );
            }
          )
        )
      );
      const hasRequiredAction = any(
        identity,
        flatten(
          (
            Object.keys(role.access.actions.user) as Array<keyof UserActions>
          ).map((key) => {
            return (
              adminUserActionPermissions.includes(key) &&
              role.access.actions.user[key] === true
            );
          })
        )
      );
      return hasRequiredPermission || hasRequiredAction;
    })
  );
};
