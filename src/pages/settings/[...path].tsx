import React, { useMemo } from "react";

import {
  NavComponentMap,
  NavConfig,
  Navigation,
} from "miracle-tv-client/Dashboard/Navigation";
import { ProfileSettings } from "miracle-tv-client/UserSettings/Profile";
import { useCurrentUserSettings } from "miracle-tv-client/hooks/auth";
import { UserPreferences } from "miracle-tv-client/UserSettings/UserPreferences";
import { Channels } from "miracle-tv-client/UserSettings/Channels";

const components: NavComponentMap = {
  "/settings/user/profile": <ProfileSettings />,
  "/settings/user/preferences": <UserPreferences />,
  "/settings/user/channels": <Channels />,
};

const SettingsPage = () => {
  const { currentSettings } = useCurrentUserSettings();

  const nav: NavConfig = useMemo(
    () => [
      {
        id: "user",
        title: "User",
        urls: [
          { id: "profile", name: "Profile", url: "/settings/user/profile" },
          {
            id: "preferences",
            name: "Preferences",
            url: "/settings/user/preferences",
          },
          {
            id: "channels",
            name: currentSettings?.singleUserMode ? "Channel" : "Channels",
            url: "/settings/user/channels",
          },
        ],
      },
      {
        id: "security",
        title: "Security",
        urls: [
          { id: "account", name: "Account", url: "/settings/security/account" },
          {
            id: "streamkeys",
            name: "Stream keys",
            url: "/settings/security/streamkeys",
          },
          {
            id: "sessions",
            name: "Sessions",
            url: "/settings/security/sessions",
          },
          {
            id: "password",
            name: "Password",
            url: "/settings/security/password",
          },
        ],
      },
    ],
    [currentSettings]
  );
  return (
    <Navigation
      title="Settings"
      nav={nav}
      components={components}
      size={[1, 10]}
    />
  );
};

export default SettingsPage;
