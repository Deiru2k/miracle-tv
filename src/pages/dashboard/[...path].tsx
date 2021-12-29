import getConfig from "next/config";
import { AuthRedirect } from "miracle-tv-client/components/auth/Redirect";
import { Feeds } from "miracle-tv-client/Dashboard/Feeds";
import {
  NavComponentMap,
  NavConfig,
  Navigation,
} from "miracle-tv-client/Dashboard/Navigation";
import { Streams } from "miracle-tv-client/Dashboard/Streams";
import Head from "next/head";
import React from "react";
import { Attract } from "miracle-tv-client/components/ui/Attract";
import { Heading } from "@chakra-ui/react";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";

const { publicRuntimeConfig } = getConfig();

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
  "/dashboard/home/streams": <Feeds />,
  "/dashboard/home/feed": <Streams />,
};

const Dashboard = () => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  return (
    <AuthRedirect>
      <Head>
        <title>Dashboard - Miracle TV</title>
      </Head>
      {publicRuntimeConfig?.isDev ? (
        <Navigation
          nav={nav}
          components={components}
          size={[1, 10]}
          title={isMobile ? "Dashboard" : undefined}
        />
      ) : (
        <Attract>
          <Heading mt={12} size="md">
            This section is under construction!
          </Heading>
        </Attract>
      )}
    </AuthRedirect>
  );
};

export default Dashboard;
