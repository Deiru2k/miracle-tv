import { useCallback, useEffect, useMemo } from "react";
import { gql } from "@apollo/client";
import { useCurrentUserFullLazyQuery, useCurrentUserFullQuery } from "miracle-tv-shared/hooks";
import { CurrentUserFullQuery, User } from "miracle-tv-shared/graphql";
import { DateTime } from "luxon";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { identity, path, prop, props } from "ramda";
import { actions } from "miracle-tv-client/store/reducers";

type CurrentUserInfo = CurrentUserFullQuery["self"];

type LocalUserStorage = {
  loading: boolean;
  expiresAt: Date;
  user: CurrentUserInfo;
};

type CurrentUserHookReturn = {
  isUserLoading: boolean;
  isUserCalled: boolean;
  user: CurrentUserInfo;
  logout: () => void;
  updateUser: (user: CurrentUserInfo) => void;
};

export const useCurrentUser = (): CurrentUserHookReturn => {
  const { push } = useRouter();

  const { data: { self } = {}, loading: isUserLoading, called: isUserCalled, refetch: loadUser } =
    useCurrentUserFullQuery({
    });

  return {
    user: self || null,
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
}

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
