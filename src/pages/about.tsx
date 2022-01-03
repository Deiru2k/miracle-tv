import React from "react";

import { Page } from "miracle-tv-client/components/system/Page";
import { Flex, Text, Heading, Image } from "@chakra-ui/react";
import { Link } from "miracle-tv-client/components/ui/Link";
import Head from "next/head";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>Miracle TV</title>
      </Head>
      <Page h="100%">
        <Flex direction="column" h="100%" justify="space-between">
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
          <Flex justify="flex-end">
            <Link href="/licenses.txt" target="_blank" ml={1}>
              [Licenses]
            </Link>
            {" | "}
            Join the development at our
            <Link
              href="https://code.gensokyo.social/Gensokyo.social/miracle-tv"
              target="_blank"
              ml={1}
            >
              [Gitea Instance]
            </Link>
            !
          </Flex>
        </Flex>
      </Page>
    </>
  );
};

export default AboutPage;
