import { gql } from "@apollo/client";
import {
  useCurrentUserFullQuery,
  useCurrentUserSettingsQuery,
} from "miracle-tv-shared/hooks";
import {
  AccessRights,
  AccessUnit,
  CurrentUserFullQuery,
  CurrentUserSettingsQuery,
} from "miracle-tv-shared/graphql";
import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";
import { checkActions, checkRight } from "miracle-tv-shared/acl/utils";

type CurrentUserInfo = CurrentUserFullQuery["self"];
type CurrentUserSettings = CurrentUserSettingsQuery["userSettings"];

type CurrentUserHookReturn = {
  isUserLoading: boolean;
  isUserCalled: boolean;
  checkRights: (unit: AccessUnit, subject: string) => boolean;
  checkActions: (subject: string, action: string) => boolean;
  currentUser: CurrentUserInfo;
  logout: () => void;
  refetchUser: () => void;
};

type CurrentUserSettingsHookReturn = {
  isSettingsLoading: boolean;
  isSettingsCalled: boolean;
  currentSettings: CurrentUserSettings;
  refetchSettings: () => void;
};

export const useCurrentUser = (): CurrentUserHookReturn => {
  const {
    data: { self } = { self: null },
    loading: isUserLoading,
    called: isUserCalled,
    refetch: refetchUser,
  } = useCurrentUserFullQuery({});
  const { reload } = useRouter();

  const checkRightsFn = useCallback(
    (unit: AccessUnit, subject: keyof AccessRights) => {
      return checkRight(self?.roles ?? [], unit, subject);
    },
    [self?.roles]
  );

  const checkActionsFn = useCallback(
    (subject: string, action: string) => {
      return checkActions(self?.roles ?? [], subject, action);
    },
    [self?.roles]
  );

  return {
    currentUser: self || null,
    isUserLoading: isUserLoading,
    checkRights: checkRightsFn,
    checkActions: checkActionsFn,
    isUserCalled,
    refetchUser,
    logout: signOut(reload),
  } as CurrentUserHookReturn;
};

export const useCurrentUserSettings = (): CurrentUserSettingsHookReturn => {
  const {
    data: { userSettings } = { userSettings: null },
    loading: isSettingsLoading,
    called: isSettingsCalled,
    refetch: refetchSettings,
  } = useCurrentUserSettingsQuery({});

  return {
    currentSettings: userSettings || null,
    isSettingsLoading,
    isSettingsCalled,
    refetchSettings,
  } as CurrentUserSettingsHookReturn;
};

export const signOut = (push: any) => () => {
  localStorage.removeItem("token");
  push("/");
};

export const CurrentUserFullFragment = gql`
  fragment CurrentUser on User {
    id
    username
    displayName
    emailHash
    bio
    emailHash
    avatar {
      id
      filename
    }
    header {
      id
      filename
    }
    streamThumbnail {
      id
      filename
    }
    roles {
      id
      parentId
      name
      access {
        rights {
          channels
          streamKeys
          roles
          users
          activities
          userSettings
          system
          sessions
        }
        actions {
          user {
            silence
            ban
            warn
          }
        }
      }
    }
    channels {
      id
      name
      slug
      description
      activity {
        id
        icon {
          id
          filename
        }
        image {
          id
          filename
        }
        name
        verb
      }
    }
  }
`;

gql`
  query CurrentUserFull {
    self {
      ...CurrentUser
    }
  }
  ${CurrentUserFullFragment}
`;

gql`
  query CurrentUserSettings {
    userSettings {
      id
      useGravatar
      singleUserMode
      singleUserChannel {
        id
      }
    }
  }
`;
