import { NotFound } from "miracle-tv-client/components/system/NotFound";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { AdminStreamKeyList } from "./StreamKeyList";

export const AdminStreamKeysPage = () => {
  const { query: { path = [] } = {} } = useRouter();

  switch (path.length) {
    case 1:
      return <AdminStreamKeyList />;
    default:
      return <NotFound />;
  }
};
