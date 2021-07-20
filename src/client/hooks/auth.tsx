import { useCallback, useEffect, useMemo } from "react";
import { gql } from "@apollo/client";
import { useCurrentUserFullLazyQuery } from "miracle-tv-shared/hooks";
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
  user: CurrentUserInfo;
  logout: () => void;
  updateUser: (user: CurrentUserInfo) => void;
};

export const useCurrentUser = (): CurrentUserHookReturn => {
  const { push } = useRouter();

  const state = useSelector((state: any) => {
    return state.currentUser;
  }) as LocalUserStorage | null;

  const dispatch = useDispatch();

  const updateUser = useCallback(
    (user: CurrentUserInfo) => {
      const newInfo = {
        user,
        expiresAt: DateTime.now().plus({ minutes: 15 }).toJSDate(),
        loading: false,
      };
      localStorage.setItem("user", JSON.stringify(newInfo));
      dispatch(actions.setUser(newInfo));
    },
    [dispatch]
  );

  const [loadUser, { loading: isUserLoading }] = useCurrentUserFullLazyQuery({
    onCompleted: ({ self }) => {
      updateUser(self);
    },
  });

  useEffect(() => {
    let user: CurrentUserInfo | null = null;
    try {
      user = JSON.parse(localStorage.getItem("user")) as CurrentUserInfo;
      dispatch(actions.setUser(user));
    } catch {
      console.error("Error Restoring user");
    }
    if (!user) {
      loadUser();
    }
  }, []);

  useEffect(() => {
    if (state) {
      const isExpired =
        DateTime.fromJSDate(state?.expiresAt).diffNow("seconds").seconds > 0;
      if (isExpired) loadUser();
    }
  }, [state]);

  useEffect(() => {
    dispatch(actions.setLoading(isUserLoading));
  }, [isUserLoading, dispatch]);

  return {
    user: state?.user || null,
    updateUser,
    isUserLoading: state?.loading || false,
    logout: () => {},
  } as CurrentUserHookReturn;
};

export const CurrentUserFullFragment = gql`
  fragment CurrentUser on User {
    id
    username
    displayName
    emailHash
    bio
    singleUserMode
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
