import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  useMultiStyleConfig,
  VStack,
} from "@chakra-ui/react";
import { NotFound } from "miracle-tv-client/components/system/NotFound";
import { NavLink } from "miracle-tv-client/components/ui/NavLink";
import { useRouter } from "next/dist/client/router";
import { path } from "ramda";
import React from "react";

export type NavConfigRecord = {
  id: string;
  url: string;
  name: string;
};

export type NavConfig = {
  id: string;
  title: string;
  urls: NavConfigRecord[];
}[];

export type NavComponentMap = Record<
  string,
  { [key: string]: React.ReactNode } | React.ReactNode
>;

export type NavTabSizes = [number, number];

type Props = {
  nav: NavConfig;
  components: NavComponentMap;
  title?: string;
  size?: NavTabSizes;
};

export const Navigation = ({ title, components, nav, size }: Props) => {
  const {
    asPath,
    query: { path: routePath = [] },
  } = useRouter();
  const styles = useMultiStyleConfig("Navigation", {});

  const menuStyles = {
    ...styles.menu,
    flex: size?.[0] || styles.menu?.flex || 2,
  };

  const contentStyles = {
    ...styles.content,
    flex: size?.[1] || styles.content.flex || 10,
  };

  const component = path(routePath as string[], components);

  return (
    <Flex sx={styles.container}>
      <VStack sx={menuStyles}>
        {!!title && (
          <>
            <Heading fontSize="1.5rem">{title}</Heading>
            <Divider />
          </>
        )}
        {nav.map((navConfig) => (
          <React.Fragment key={navConfig.id}>
            <Heading sx={styles.header}>{navConfig.title}</Heading>
            {navConfig.urls.map((configRecord) => (
              <NavLink
                href={configRecord.url}
                key={configRecord.id}
                isActive={asPath === configRecord.url}
              >
                {configRecord.name}
              </NavLink>
            ))}
          </React.Fragment>
        ))}
      </VStack>
      <Box sx={contentStyles}>
        {!component && <NotFound isBacklinkHidden />}
        {!!component && component}
      </Box>
    </Flex>
  );
};
