import React from "react";

import { Page } from "miracle-tv-client/components/system/Page";
import { Flex, Text, Heading, Image, Box } from "@chakra-ui/react";
import { Link } from "miracle-tv-client/components/ui/Link";
import Head from "next/head";
import { Streams } from "miracle-tv-client/Dashboard/Streams";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";

const AboutPage = () => {
  const { currentUser } = useCurrentUser();
  return (
    <>
      <Head>
        <title>Miracle TV</title>
      </Head>
      <Page h="100%">
        <Flex direction="column" h="100%" justify="space-between">
          <Flex justify="center" direction="column" align="center" w="100%">
            <Flex justify="center" direction="column" align="center" mb={6}>
              <Image src="/images/sanae_gyate.png" w="10vw" h="10vw" mb={4} />
              <Heading mb={4}>Welcome to Miracle TV!</Heading>
              <Heading size="md">An open source streaming suite.</Heading>
              {!currentUser && (
                <Text as="span" size="md" w="100%" textAlign="center">
                  <Link href="/auth/login">[Login]</Link> or{" "}
                  <Link href="/auth/sign-up">[Sign up]</Link> to start using
                  this instance.
                </Text>
              )}
            </Flex>
            <Streams
              skipSubs
              discoverTitle="Here's a sample of the channels this instance has!"
            />
          </Flex>
          <Flex justify="flex-end">
            <Link href="/licenses.txt" target="_blank" mr={1}>
              [Licenses]
            </Link>
            {" | "}
            <Link href="/ASSET-LICENSE.txt" target="_blank" ml={1} mr={1}>
              [Assets licenses]
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
