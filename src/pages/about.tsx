import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Page } from "miracle-tv-client/components/system/Page";
import { Flex, Text, Heading, Image, Box } from "@chakra-ui/react";
import { Link } from "miracle-tv-client/components/ui/Link";
import Head from "next/head";
import { Streams } from "miracle-tv-client/Dashboard/Streams";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { useTranslation } from "next-i18next";

const AboutPage = () => {
  const { currentUser } = useCurrentUser();
  const { t: tAbout } = useTranslation("about");
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
              <Heading mb={4}>{tAbout("welcome")}</Heading>
              <Heading size="md">{tAbout("subtitle")}</Heading>
              {!currentUser && (
                <Text as="span" size="md" w="100%" textAlign="center">
                  <Link href="/auth/login">[{tAbout("login")}]</Link>{" "}
                  {tAbout("or")}{" "}
                  <Link href="/auth/sign-up">[{tAbout("signup")}]</Link>{" "}
                  {tAbout("start-using")}
                </Text>
              )}
            </Flex>
            <Streams skipSubs discoverTitle={tAbout("discover")} />
          </Flex>
          <Flex justify="flex-end">
            <Link href="/licenses.txt" target="_blank" mr={1}>
              [{tAbout("licenses")}]
            </Link>
            {" | "}
            <Link href="/ASSET-LICENSE.txt" target="_blank" ml={1} mr={1}>
              [{tAbout("asset-licenses")}]
            </Link>
            {" | "}
            {tAbout("join-development")}
            <Link
              href="https://code.gensokyo.social/Gensokyo.social/miracle-tv"
              target="_blank"
              ml={1}
            >
              [{tAbout("gitea-instance")}]
            </Link>
            !
          </Flex>
        </Flex>
      </Page>
    </>
  );
};

export default AboutPage;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navbar", "about"])),
    },
  };
}
