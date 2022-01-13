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

const components: NavComponentMap = {
  "/admin": { component: <AdminDashboard />, exact: true },
  "/admin/users": { component: <AdminUserList /> },
  "/admin/roles": { component: <AdminRolesPage /> },
  "/admin/channels": { component: <AdminChannelsPage /> },
  "/admin/activities": { component: <AdminActivitiesPage /> },
};

const AdminPage = () => {
  const { checkRights } = useCurrentUser();
  const nav: NavConfig = useMemo(() => {
    return [
      {
        id: "admin",
        urls: [
          checkRights(AccessUnit.Read, "system") && {
            id: "dashboard",
            name: "Admin Dashboard",
            url: "/admin",
            exact: true,
          },
          checkRights(AccessUnit.Read, "users") && {
            id: "users",
            name: "Users",
            url: "/admin/users",
          },
          checkRights(AccessUnit.Read, "channels") && {
            id: "channels",
            name: "Channels",
            url: "/admin/channels",
          },
          checkRights(AccessUnit.Read, "roles") && {
            id: "roles",
            name: "Roles",
            url: "/admin/roles",
          },
          checkRights(AccessUnit.Read, "streamKeys") && {
            id: "streamkeys",
            name: "Stream Keys",
            url: "/admin/stream-keys",
          },
          checkRights(AccessUnit.Read, "sessions") && {
            id: "sessions",
            name: "Sessions",
            url: "/admin/sessions",
          },
          checkRights(AccessUnit.Read, "activities") && {
            id: "activities",
            name: "Activities",
            url: "/admin/activities",
          },
        ].filter(identity),
      },
    ];
  }, [checkRights]);
  return (
    <AuthRedirect>
      <Head>
        <title>Admin Panel - Miracle TV</title>
      </Head>
      <Navigation
        title="Instance Admin"
        nav={nav}
        components={components}
        size={[1, 10]}
      />
    </AuthRedirect>
  );
};

export default AdminPage;
