import React, { useMemo } from "react";

import {
  NavComponentMap,
  NavConfig,
  Navigation,
} from "miracle-tv-client/Dashboard/Navigation";
import { ProfileSettings } from "miracle-tv-client/UserSettings/Profile";
import { useCurrentUserSettings } from "miracle-tv-client/hooks/auth";
import { UserPreferences } from "miracle-tv-client/UserSettings/UserPreferences";

const components: NavComponentMap = {
  user: {
    profile: <ProfileSettings />,
    preferences: <UserPreferences />,
  },
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
    ],
    [currentSettings]
  );
  return <Navigation title="Settings" nav={nav} components={components} />;
};

export default SettingsPage;
