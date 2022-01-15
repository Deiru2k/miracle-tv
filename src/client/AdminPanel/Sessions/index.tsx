import { NotFound } from "miracle-tv-client/components/system/NotFound";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { AdminSessionsList } from "./SessionList";

export const AdminSessionsPage = () => {
  const { query: { path = [] } = {} } = useRouter();

  switch (path.length) {
    case 1:
      return <AdminSessionsList />;
    default:
      return <NotFound />;
  }
};
