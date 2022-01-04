import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  useMultiStyleConfig,
  VStack,
} from "@chakra-ui/react";
import { NotFound } from "miracle-tv-client/components/system/NotFound";
import { NavLink } from "miracle-tv-client/components/ui/NavLink";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useMemo, useState } from "react";

export type NavConfigRecord = {
  id: string;
  url: string;
  name: string;
  exact?: boolean;
};

export type NavConfig = {
  id: string;
  title?: string;
  urls: NavConfigRecord[];
}[];

export type NavComponentMap = Record<
  string,
  { exact?: boolean; component: React.ReactNode }
>;

export type NavTabSizes = [number, number];

type Props = {
  nav: NavConfig;
  components: NavComponentMap;
  title?: string;
  size?: NavTabSizes;
};

export const Navigation = ({ title, components, nav, size }: Props) => {
  const { asPath } = useRouter();
  const styles = useMultiStyleConfig("Navigation", {});
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const menuStyles = {
    ...styles.menu,
    flex: size?.[0] || styles.menu?.flex || 2,
  };

  const isActive = useCallback(
    (url: string, exact: boolean) => {
      if (exact) return asPath === url;
      return asPath.startsWith(url);
    },
    [asPath]
  );

  const flexDirection = isMobile ? "column" : "row";
  const menuCollapseStyles = useMemo(
    () =>
      isMobile
        ? {
            flex: "initial",
            flexGrow: 0,
            height: isMenuOpen ? "100%" : "0px",
            overflow: isMenuOpen ? "initial" : "hidden",
            boxShadow: isMenuOpen ? menuStyles.boxShadow : "none",
            backgroundColor: isMenuOpen
              ? menuStyles.backgroundColor
              : "transparent",
            m: 0,
            pt: 0,
            pb: isMenuOpen ? 2 : 0,
            px: 2,
            transition: "all linear 0.3s",
          }
        : {},
    [isMenuOpen, isMobile]
  );
  const contentMobileStyles = isMobile
    ? {
        pr: 2,
        alignSelf: "initial",
      }
    : {};

  const contentStyles = {
    ...styles.content,
    flex: size?.[1] || styles.content.flex || 10,
  };

  // Find a component for navigation.
  const { component } =
    (useMemo(() => {
      // First find the key
      const componentKey = Object.keys(components).find((key) => {
        const componentConfig = components[key];
        // If we mark component item as "exact" it must match the path exactly
        // Otherwise it matches if path is present at the beginning of current url
        if (componentConfig.exact) return asPath === key;
        return asPath.startsWith(key);
      });
      return components[componentKey] || {};
    }, [asPath]) as NavComponentMap[keyof NavComponentMap]) || {};

  const onMobileClick = useCallback(() => {
    if (isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile, setMenuOpen]);

  return (
    <Flex sx={styles.container as any} direction={flexDirection}>
      {isMobile && (
        <Flex
          w="100%"
          justifyContent="space-between"
          align="center"
          p={2}
          bgColor={menuStyles.backgroundColor as any}
        >
          {title && <Heading fontSize="1.5rem">{title}</Heading>}
          <IconButton
            variant="ghost"
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={() => setMenuOpen(!isMenuOpen)}
          />
        </Flex>
      )}
      <VStack
        sx={{
          ...(menuStyles as any),
          ...menuCollapseStyles,
        }}
        onClick={onMobileClick}
      >
        {!!title && !isMobile && (
          <>
            <Heading fontSize="1.5rem">{title}</Heading>
            <Divider />
          </>
        )}
        {nav.map((navConfig) => (
          <React.Fragment key={navConfig.id}>
            {navConfig.title && (
              <Heading sx={styles.header}>{navConfig.title}</Heading>
            )}
            {navConfig.urls.map((configRecord) => (
              <NavLink
                href={configRecord.url}
                key={configRecord.id}
                isActive={isActive(
                  configRecord.url,
                  configRecord?.exact ?? false
                )}
              >
                {configRecord.name}
              </NavLink>
            ))}
          </React.Fragment>
        ))}
      </VStack>
      <Box sx={{ ...contentStyles, ...contentMobileStyles }}>
        {!component && <NotFound isTextHidden />}
        {!!component && component}
      </Box>
    </Flex>
  );
};
