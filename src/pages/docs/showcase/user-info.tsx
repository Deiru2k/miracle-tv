import React from "react";
import { UserInfo } from "miracle-tv-client/components/ui/UserInfo";
import { createShowcase } from "miracle-tv-shared/showcase/create";

export default createShowcase(
  <UserInfo
    color="white"
    user={{
      displayName: "User Name",
      username: "user",
      avatar: { filename: "58ed5aec-b6a5-4fa0-b890-6fd4b84ecdfe.png" },
    }}
  />,
  { title: "User Info" }
);
