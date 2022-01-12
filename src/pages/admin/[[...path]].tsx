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

const components: NavComponentMap = {
  "/admin": { component: <AdminDashboard />, exact: true },
  "/admin/users": { component: <AdminUserList /> },
  "/admin/roles": { component: <AdminRolesPage /> },
  "/admin/channels": { component: <AdminChannelsPage /> },
  "/admin/activities": { component: <AdminActivitiesPage /> },
};

const nav: NavConfig = [
  {
    id: "admin",
    urls: [
      { id: "dashboard", name: "Admin Dashboard", url: "/admin", exact: true },
      { id: "users", name: "Users", url: "/admin/users" },
      {
        id: "channels",
        name: "Channels",
        url: "/admin/channels",
      },
      {
        id: "roles",
        name: "Roles",
        url: "/admin/roles",
      },
      {
        id: "streamkeys",
        name: "Stream Keys",
        url: "/admin/stream-keys",
      },
      {
        id: "sessions",
        name: "Sessions",
        url: "/admin/sessions",
      },
      {
        id: "activities",
        name: "Activities",
        url: "/admin/activities",
      },
    ],
  },
];

const AdminPage = () => {
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
