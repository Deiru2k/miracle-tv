import React from "react";

import { AuthRedirect } from "miracle-tv-client/components/auth/Redirect";
import { Page } from "miracle-tv-client/components/system/Page";
import { ProfileSettings } from "miracle-tv-client/UserSettings/Profile";
import { Heading, Link } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const ProfilePage = () => {
  return (
    <AuthRedirect>
      <Page px={20}>
        <Heading as="h2" size="lg" mb={6}>
          <Link href="/" aria-label="back">
            <ChevronLeftIcon size="xl" />
          </Link>
          Settings
        </Heading>
        <ProfileSettings />
      </Page>
    </AuthRedirect>
  );
};

export default ProfilePage;
