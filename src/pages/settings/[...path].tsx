import React, { useMemo } from "react";

import {
  NavComponentMap,
  NavConfig,
  Navigation,
} from "miracle-tv-client/components/ui/Navigation";
import { ProfileSettings } from "miracle-tv-client/UserSettings/Profile";
import {
  useCurrentUser,
  useCurrentUserSettings,
} from "miracle-tv-client/hooks/auth";
import { UserPreferences } from "miracle-tv-client/UserSettings/UserPreferences";
import { Channels } from "miracle-tv-client/UserSettings/Channels";
import { AccountSettings } from "miracle-tv-client/UserSettings/AccountSettings";
import { AccountStreamKeys } from "miracle-tv-client/UserSettings/AccountStreamKeys";
import { AccountSessions } from "miracle-tv-client/UserSettings/AccountSessions";
import { AuthRedirect } from "miracle-tv-client/components/auth/Redirect";
import { AccessUnit } from "miracle-tv-shared/graphql";
import { identity } from "ramda";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const components: NavComponentMap = {
  "/settings/user/profile": { component: <ProfileSettings /> },
  "/settings/user/preferences": { component: <UserPreferences /> },
  "/settings/user/channels": { component: <Channels /> },
  "/settings/security/account": { component: <AccountSettings /> },
  "/settings/security/streamkeys": { component: <AccountStreamKeys /> },
  "/settings/security/sessions": { component: <AccountSessions /> },
};

const SettingsPage = () => {
  const { checkRights } = useCurrentUser();
  const { currentSettings } = useCurrentUserSettings();

  const { t: tSettings } = useTranslation("settings");

  const permissions = useMemo(
    () => ({
      canViewStreamKeys: checkRights(AccessUnit.Self, "streamKeys"),
      canViewChannels: checkRights(AccessUnit.Self, "channels"),
      canViewSessions: checkRights(AccessUnit.Self, "sessions"),
      canViewSettings: checkRights(AccessUnit.Self, "userSettings"),
      canViewProfile: checkRights(AccessUnit.Self, "users"),
    }),
    [checkRights]
  );

  const nav: NavConfig = useMemo(
    () => [
      {
        id: "user",
        title: tSettings("ui-user"),
        urls: [
          permissions.canViewProfile && {
            id: "profile",
            name: tSettings("ui-profile"),
            url: "/settings/user/profile",
          },
          permissions.canViewSettings && {
            id: "preferences",
            name: tSettings("ui-preferences"),
            url: "/settings/user/preferences",
          },
          permissions.canViewChannels && {
            id: "channels",
            name: currentSettings?.singleUserMode
              ? tSettings("ui-channel")
              : tSettings("ui-channels"),
            url:
              currentSettings?.singleUserMode &&
              currentSettings?.singleUserChannel?.id
                ? `/settings/user/channels/${currentSettings?.singleUserChannel?.id}/details`
                : "/settings/user/channels",
          },
        ].filter(identity),
      },
      {
        id: "security",
        title: tSettings("ui-security"),
        urls: [
          permissions.canViewProfile && {
            id: "account",
            name: tSettings("ui-account"),
            url: "/settings/security/account",
          },
          permissions.canViewStreamKeys && {
            id: "streamkeys",
            name: tSettings("ui-streamkeys"),
            url: "/settings/security/streamkeys",
          },
          permissions.canViewSessions && {
            id: "sessions",
            name: tSettings("ui-sessions"),
            url: "/settings/security/sessions",
          },
        ].filter(identity),
      },
    ],
    [
      currentSettings,
      currentSettings?.singleUserChannel?.id,
      permissions,
      tSettings,
    ]
  );
  return (
    <AuthRedirect>
      <Navigation
        title={tSettings("ui-settings")}
        nav={nav}
        components={components}
        size={[1, 10]}
      />
    </AuthRedirect>
  );
};

export default SettingsPage;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "channel",
        "settings",
        "streamkey",
        "user",
        "session",
      ])),
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [] as string[],
    fallback: "blocking",
  };
}
