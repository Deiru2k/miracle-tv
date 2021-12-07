import { Feeds } from "miracle-tv-client/Dashboard/Feeds";
import {
  NavComponentMap,
  NavConfig,
  Navigation,
} from "miracle-tv-client/Dashboard/Navigation";
import { Streams } from "miracle-tv-client/Dashboard/Streams";
import { ProfileSettings } from "miracle-tv-client/UserSettings/Profile";
import React from "react";

const nav: NavConfig = [
  {
    id: "home",
    title: "Home",
    urls: [
      {
        id: "streams",
        name: "Streams",
        url: "/dashboard/home/streams",
      },
      {
        id: "feed",
        name: "Feed",
        url: "/dashboard/home/feed",
      },
    ],
  },
  {
    id: "explore",
    title: "Explore",
    urls: [
      {
        id: "local",
        name: "Local",
        url: "/dashboard/explore/local",
      },
      {
        id: "network",
        name: "Network",
        url: "/dashboard/explore/network",
      },
    ],
  },
];
const components: NavComponentMap = {
  feeds: {
    home: <Feeds />,
  },
  streams: {
    home: <Streams />,
    local: <Feeds />,
  },
  settings: {
    profile: <ProfileSettings />,
  },
};

const Dashboard = () => {
  return <Navigation nav={nav} components={components} size={[1, 10]} />;
};

export default Dashboard;
