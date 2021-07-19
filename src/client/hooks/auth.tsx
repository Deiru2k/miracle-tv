import { useCallback, useEffect, useMemo, useState } from "react";
import { gql } from "@apollo/client";
import { useCurrentUserFullLazyQuery } from "miracle-tv-shared/hooks";
import { CurrentUserFullQuery } from "miracle-tv-shared/graphql";
import { DateTime } from "luxon";
import { useRouter } from "next/dist/client/router";

type CurrentUserInfo = CurrentUserFullQuery["self"];

type LocalUserStorage = {
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
  const [fakeLoading, setFakeLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<CurrentUserInfo | null>(null);

  const updateUser = useCallback(
    (user: CurrentUserInfo) => {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          expiresAt: DateTime.now().plus({ minutes: 30 }).toJSDate(),
          user,
        } as LocalUserStorage)
      );
      setCurrentUser(user);
      setFakeLoading(false);
    },
    [setCurrentUser]
  );

  const [loadUser, { loading }] = useCurrentUserFullLazyQuery({
    onCompleted: ({ self }) => {
      updateUser(self);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !currentUser) {
      let localUser: LocalUserStorage;
      try {
        localUser = JSON.parse(
          sessionStorage.getItem("user")
        ) as LocalUserStorage;
      } catch {
        console.error("Couldn't get local user from storage");
      }
      if (!localUser || !localUser?.expiresAt) {
        loadUser();
      } else if (localUser) {
        const isExpired =
          DateTime.fromJSDate(localUser.expiresAt).diffNow("seconds").seconds >
          0;
        if (isExpired) {
          loadUser();
        } else {
          setCurrentUser(localUser.user);
          setFakeLoading(false);
        }
      }
    }
  }, [currentUser, loadUser, setFakeLoading]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setCurrentUser(null);
    push("/");
  }, [setCurrentUser]);

  return useMemo(
    () => ({
      isUserLoading: loading || fakeLoading,
      user: currentUser,
      logout: logout,
      updateUser,
    }),
    [currentUser, loading]
  );
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
