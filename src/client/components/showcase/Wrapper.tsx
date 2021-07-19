import { Box, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";

export type ComponentConfig = {
  url: string;
  title: string;
};

const components: ComponentConfig[] = [
  { url: "/docs/showcase", title: "Home" },
  { url: "/docs/showcase/button", title: "Button" },
  { url: "/docs/showcase/panel", title: "Panel" },
];

const docs: ComponentConfig[] = [{ url: "/docs", title: "Home" }];

const ShowcaseLink = ({ url, title }: ComponentConfig) => {
  const { asPath } = useRouter();
  const isActive = asPath === url;
  return (
    <Box
      cursor="pointer"
      p={2}
      textAlign="center"
      bgColor={isActive ? "primary.500" : "white"}
      color={isActive ? "white" : "black"}
      _notLast={{
        borderBottom: "1px solid gray",
      }}
      transition="all 0.4s ease-in-out"
    >
      {" "}
      <Link href={url}>
        <Box w="100%" h="100%">
          {title}
        </Box>
      </Link>
    </Box>
  );
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const ShowcaseWrapper = ({ children }: Props) => {
  return (
    <Flex w="100%" h="100%">
      <Flex
        flex={1}
        direction="column"
        borderRightWidth="4px"
        borderRightColor="primary.200"
        borderRightStyle="solid"
      >
        <Heading p={2} mb={2} size="md" textAlign="center">
          Documentation
        </Heading>
        <Flex direction="column">
          {docs.map((cmp) => (
            <ShowcaseLink key={cmp.url} {...cmp} />
          ))}
        </Flex>
        <Heading p={2} mt={2} mb={2} size="md" textAlign="center">
          Showcase
        </Heading>
        <Flex direction="column">
          {components.map((cmp) => (
            <ShowcaseLink key={cmp.url} {...cmp} />
          ))}
        </Flex>
      </Flex>
      <Box flex={9}>{children}</Box>
    </Flex>
  );
};
