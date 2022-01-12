import { NotFound } from "miracle-tv-client/components/system/NotFound";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { AdminActivitiesList } from "./ActivitiesList";
import { AdminActivityPage } from "./ActivityPage";

export const AdminActivitiesPage = () => {
  const { query: { path = [] } = {} } = useRouter();

  switch (path.length) {
    case 1:
      return <AdminActivitiesList />;
    case 2:
      return <AdminActivityPage id={path[1]} />;
    default:
      return <NotFound />;
  }
};
