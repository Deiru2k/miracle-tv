import { NotFound } from "miracle-tv-client/components/system/NotFound";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { AdminRolesList } from "./RoleList";
import { AdminRolePage } from "./RolePage";

export const AdminRolesPage = () => {
  const { query: { path = [] } = {} } = useRouter();

  switch (path.length) {
    case 1:
      return <AdminRolesList />;
    case 2:
      return <AdminRolePage id={path[1]} />;
    default:
      return <NotFound />;
  }
};
