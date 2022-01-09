import { NotFound } from "miracle-tv-client/components/system/NotFound";
import { ChannelSettingsPage } from "miracle-tv-client/UserSettings/ChannelSettingsPage";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { AdminChannelList } from "./ChannelList";

export const AdminChannelsPage = () => {
  const { query: { path = [] } = {} } = useRouter();

  switch (path.length) {
    case 1:
      return <AdminChannelList />;
    case 2:
      return <ChannelSettingsPage channelId={path[1]} />;
    case 3:
      return (
        <ChannelSettingsPage
          channelId={path[1]}
          tab={path[2]}
          baseUrl="/admin/channels"
        />
      );
    default:
      return <NotFound />;
  }
};
