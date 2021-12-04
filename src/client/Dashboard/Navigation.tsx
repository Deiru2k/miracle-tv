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
import { NavLink } from "miracle-tv-client/components/ui/NavLink";
import { useRouter } from "next/dist/client/router";
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

type Props = {
  children: React.ReactNode;
  nav: NavConfig;
  title?: string;
};

export const Navigation = ({ title, children, nav }: Props) => {
  const { asPath } = useRouter();
  const styles = useMultiStyleConfig("Navigation", {});

  return (
    <Flex sx={styles.container}>
      <VStack sx={styles.menu}>
        {!!title && (
          <>
            <Heading>{title}</Heading>
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
      <Box sx={styles.content}>{children}</Box>
    </Flex>
  );
};
