import React, { useMemo } from "react";

import {
  NavComponentMap,
  NavConfig,
  Navigation,
} from "miracle-tv-client/components/ui/Navigation";
import { AuthRedirect } from "miracle-tv-client/components/auth/Redirect";
import { AdminDashboard } from "miracle-tv-client/AdminPanel/AdminDashboard";

const components: NavComponentMap = {
  "/admin": { component: <AdminDashboard />, exact: true },
  "/admin/users": { component: <>Users lmao</> },
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
        url: "/admin/Roles",
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
