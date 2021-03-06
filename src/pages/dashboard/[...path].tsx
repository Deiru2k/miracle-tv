import getConfig from "next/config";
import { AuthRedirect } from "miracle-tv-client/components/auth/Redirect";
import { Feeds } from "miracle-tv-client/Dashboard/Feeds";
import {
  NavComponentMap,
  NavConfig,
  Navigation,
} from "miracle-tv-client/components/ui/Navigation";
import { Streams } from "miracle-tv-client/Dashboard/Streams";
import Head from "next/head";
import React, { useMemo } from "react";
import { Attract } from "miracle-tv-client/components/ui/Attract";
import { Heading } from "@chakra-ui/react";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { DashboardUserDirectory } from "miracle-tv-client/Dashboard/Users";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { TranslationFn } from "miracle-tv-client/types";

const { publicRuntimeConfig } = getConfig();

type NavConfigFn = (tl: TranslationFn) => NavConfig;

const navMenu: NavConfigFn = (tl) =>
  [
    {
      id: "home",
      title: tl?.("ui-home") ?? "Home",
      urls: [
        {
          id: "streams",
          name: tl?.("ui-streams") ?? "Streams",
          url: "/dashboard/home/streams",
        },
        {
          id: "users",
          name: tl?.("ui-user-directory") ?? "User Directory",
          url: "/dashboard/home/directory",
        },
        publicRuntimeConfig.isDev
          ? {
              id: "feed",
              name: "Feed",
              url: "/dashboard/home/feed",
            }
          : null,
      ].filter(Boolean),
    },
    publicRuntimeConfig.isDev
      ? {
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
        }
      : null,
  ].filter(Boolean);

const components: NavComponentMap = {
  "/dashboard/home/streams": { component: <Streams /> },
  "/dashboard/home/feed": { component: <Feeds /> },
  "/dashboard/home/directory": { component: <DashboardUserDirectory /> },
};

const Dashboard = () => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const { t: tDashboard } = useTranslation("dashboard");
  const nav = useMemo(() => navMenu(tDashboard), [tDashboard]);
  return (
    <AuthRedirect>
      {" "}
      <Head>
        <title>{tDashboard("ui-dashboard")} - Miracle TV</title>
      </Head>
      <Navigation
        nav={nav}
        components={components}
        size={[1, 10]}
        title={isMobile ? tDashboard("ui-dashboard") : undefined}
      />
    </AuthRedirect>
  );
};

export default Dashboard;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "dashboard"])),
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [] as string[],
    fallback: "blocking",
  };
}
