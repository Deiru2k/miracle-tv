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

  const canViewStreamKeys = useMemo(
    () => checkRights(AccessUnit.Self, "streamKeys"),
    [checkRights]
  );
  const canViewChannels = useMemo(
    () => checkRights(AccessUnit.Self, "channels"),
    [checkRights]
  );
  const canViewSessions = useMemo(
    () => checkRights(AccessUnit.Self, "sessions"),
    [checkRights]
  );
  const canViewSettings = useMemo(
    () => checkRights(AccessUnit.Self, "userSettings"),
    [checkRights]
  );
  const canViewProfile = useMemo(
    () => checkRights(AccessUnit.Self, "users"),
    [checkRights]
  );

  const nav: NavConfig = useMemo(
    () => [
      {
        id: "user",
        title: "User",
        urls: [
          canViewProfile && {
            id: "profile",
            name: "Profile",
            url: "/settings/user/profile",
          },
          canViewSettings && {
            id: "preferences",
            name: "Preferences",
            url: "/settings/user/preferences",
          },
          canViewChannels && {
            id: "channels",
            name: currentSettings?.singleUserMode ? "Channel" : "Channels",
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
        title: "Security",
        urls: [
          canViewProfile && {
            id: "account",
            name: "Account",
            url: "/settings/security/account",
          },
          canViewStreamKeys && {
            id: "streamkeys",
            name: "Stream keys",
            url: "/settings/security/streamkeys",
          },
          canViewSessions && {
            id: "sessions",
            name: "Sessions",
            url: "/settings/security/sessions",
          },
        ].filter(identity),
      },
    ],
    [currentSettings, currentSettings?.singleUserChannel?.id]
  );
  return (
    <AuthRedirect>
      <Navigation
        title="Settings"
        nav={nav}
        components={components}
        size={[1, 10]}
      />
    </AuthRedirect>
  );
};

export default SettingsPage;
