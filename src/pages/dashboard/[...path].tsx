import { Box, Button, Heading } from "@chakra-ui/react";
import { Feeds } from "miracle-tv-client/Dashboard/Feeds";
import { NavConfig, Navigation } from "miracle-tv-client/Dashboard/Navigation";
import { Streams } from "miracle-tv-client/Dashboard/Streams";
import { ProfileSettings } from "miracle-tv-client/UserSettings/Profile";
import { useRouter } from "next/dist/client/router";
import { head, pathOr } from "ramda";
import React from "react";

const Dashboard = () => {
  const {
    query: { path },
  } = useRouter();
  const nav: NavConfig = [
    {
      id: "streams",
      title: "Streams",
      urls: [
        {
          id: "home",
          name: "Subscriptions",
          url: "/dashboard/streams/home",
        },
        {
          id: "local",
          name: "Local",
          url: "/dashboard/streams/local",
        },
      ],
    },
    // {
    //   id: "feeds",
    //   title: "Feeds",
    //   urls: [
    //     {
    //       id: "home",
    //       name: "Home",
    //       url: "/dashboard/feeds/home",
    //     },
    //   ],
    // },
    {
      id: "settings",
      title: "Settings",
      urls: [
        { id: "general", name: "Profile", url: "/dashboard/settings/profile" },
      ],
    },
  ];
  const NotFound = () => <Box>{"Ooops, this page doesn't exist"}</Box>;
  const components = {
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
    default: <NotFound />,
  };

  const component = pathOr(components.default, path as string[], components);
  return (
    <Navigation title="Dashboard" nav={nav}>
      {component}
    </Navigation>
  );
};

export default Dashboard;
