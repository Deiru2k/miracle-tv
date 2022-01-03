import React from "react";

import { Page } from "miracle-tv-client/components/system/Page";
import { Flex, Text, Heading, Image } from "@chakra-ui/react";
import { Link } from "miracle-tv-client/components/ui/Link";

const AboutPage = () => {
  return (
    <Page>
      <Flex justify="center" direction="column" align="center">
        <Image src="/images/sanae_gyate.png" w="20vw" h="20vw" />
        <Heading>Welcome to Miracle TV!</Heading>
        <Heading size="md">An open source streaming suite.</Heading>
        <Text as="span" size="md">
          <Link href="/auth/login">[Login]</Link> or{" "}
          <Link href="/auth/sign-up">[Sign up]</Link> to start using this
          instance.
        </Text>
      </Flex>
    </Page>
  );
};

export default AboutPage;
