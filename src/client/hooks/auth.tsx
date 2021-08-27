import { gql } from "@apollo/client";
import { useCurrentUserFullQuery } from "miracle-tv-shared/hooks";
import { CurrentUserFullQuery } from "miracle-tv-shared/graphql";

type CurrentUserInfo = CurrentUserFullQuery["self"];

type CurrentUserHookReturn = {
  isUserLoading: boolean;
  isUserCalled: boolean;
  currentUser: CurrentUserInfo;
  logout: () => void;
  updateUser: (user: CurrentUserInfo) => void;
};

export const useCurrentUser = (): CurrentUserHookReturn => {
  const {
    data: { self } = {},
    loading: isUserLoading,
    called: isUserCalled,
  } = useCurrentUserFullQuery({});

  return {
    currentUser: self || null,
    isUserLoading: isUserLoading,
    isUserCalled,
    logout: () => {},
  } as CurrentUserHookReturn;
};

export const signOut = () => {
  localStorage.removeItem("token");
  if (global.window) {
    window.location.replace("/auth/login");
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
