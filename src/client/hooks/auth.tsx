import { gql } from "@apollo/client";
import {
  useCurrentUserFullQuery,
  useCurrentUserSettingsQuery,
} from "miracle-tv-shared/hooks";
import {
  CurrentUserFullQuery,
  CurrentUserSettingsQuery,
} from "miracle-tv-shared/graphql";

type CurrentUserInfo = CurrentUserFullQuery["self"];
type CurrentUserSettings = CurrentUserSettingsQuery["userSettings"];

type CurrentUserHookReturn = {
  isUserLoading: boolean;
  isUserCalled: boolean;
  currentUser: CurrentUserInfo;
  logout: () => void;
};

type CurrentUserSettingsHookReturn = {
  isUserLoading: boolean;
  isUserCalled: boolean;
  currentSettings: CurrentUserSettings;
};

export const useCurrentUser = (): CurrentUserHookReturn => {
  const {
    data: { self } = { self: null },
    loading: isUserLoading,
    called: isUserCalled,
  } = useCurrentUserFullQuery({});

  return {
    currentUser: self || null,
    isUserLoading: isUserLoading,
    isUserCalled,
  } as CurrentUserHookReturn;
};

export const useCurrentUserSettings = (): CurrentUserSettingsHookReturn => {
  const {
    data: { userSettings } = { userSettings: null },
    loading: isSettingsLoading,
    called: isSettingsCalled,
  } = useCurrentUserSettingsQuery({});

  return {
    currentSettings: userSettings || null,
    isSettingsLoading,
    isSettingsCalled,
  } as CurrentUserSettingsHookReturn;
};

export const signOut = () => {
  localStorage.removeItem("token");
  if (global.window) {
    window.location.replace("/");
  }
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
          users
          activities
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
        icon
        image
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
    }
  }
`;
