import React, { useMemo } from "react";

import {
  NavComponentMap,
  NavConfig,
  Navigation,
} from "miracle-tv-client/components/ui/Navigation";
import { AuthRedirect } from "miracle-tv-client/components/auth/Redirect";
import { AdminDashboard } from "miracle-tv-client/AdminPanel/AdminDashboard";
import { AdminUserList } from "miracle-tv-client/AdminPanel/Users";
import { AdminRolesPage } from "miracle-tv-client/AdminPanel/Roles";
import Head from "next/head";
import { AdminChannelsPage } from "miracle-tv-client/AdminPanel/Channels";
import { AdminActivitiesPage } from "miracle-tv-client/AdminPanel/Activities";
import { identity } from "ramda";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { AccessUnit } from "miracle-tv-shared/graphql";
import { AdminStreamKeysPage } from "miracle-tv-client/AdminPanel/StreamKeys";
import { AdminSessionsPage } from "miracle-tv-client/AdminPanel/Sessions";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const components: NavComponentMap = {
  "/admin": { component: <AdminDashboard />, exact: true },
  "/admin/users": { component: <AdminUserList /> },
  "/admin/roles": { component: <AdminRolesPage /> },
  "/admin/channels": { component: <AdminChannelsPage /> },
  "/admin/activities": { component: <AdminActivitiesPage /> },
  "/admin/stream-keys": { component: <AdminStreamKeysPage /> },
  "/admin/sessions": { component: <AdminSessionsPage /> },
};

const AdminPage = () => {
  const { checkRights } = useCurrentUser();
  const { t: tAdmin } = useTranslation("admin");
  const nav: NavConfig = useMemo(() => {
    return [
      {
        id: "admin",
        urls: [
          checkRights(AccessUnit.Read, "system") && {
            id: "dashboard",
            name: tAdmin("dashboard"),
            url: "/admin",
            exact: true,
          },
          checkRights(AccessUnit.Read, "users") && {
            id: "users",
            name: tAdmin("users"),
            url: "/admin/users",
          },
          checkRights(AccessUnit.Read, "channels") && {
            id: "channels",
            name: tAdmin("channels"),
            url: "/admin/channels",
          },
          checkRights(AccessUnit.Read, "roles") && {
            id: "roles",
            name: tAdmin("roles"),
            url: "/admin/roles",
          },
          checkRights(AccessUnit.Read, "streamKeys") && {
            id: "streamkeys",
            name: tAdmin("streamkeys"),
            url: "/admin/stream-keys",
          },
          checkRights(AccessUnit.Read, "sessions") && {
            id: "sessions",
            name: tAdmin("sessions"),
            url: "/admin/sessions",
          },
          checkRights(AccessUnit.Read, "activities") && {
            id: "activities",
            name: tAdmin("activities"),
            url: "/admin/activities",
          },
        ].filter(identity),
      },
    ];
  }, [checkRights]);
  return (
    <AuthRedirect>
      <Head>
        <title>{tAdmin("admin-panel-title")} - Miracle TV</title>
      </Head>
      <Navigation
        title={tAdmin("admin-panel-title")}
        nav={nav}
        components={components}
        size={[1, 10]}
      />
    </AuthRedirect>
  );
};

export default AdminPage;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "navbar",
        "admin",
        "filter",
        "user",
        "channel",
        "role",
        "session",
        "activity",
        "streamkey",
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
