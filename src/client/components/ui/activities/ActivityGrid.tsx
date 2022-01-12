import {
  Activity,
  AdminActivityFragmentFragment,
} from "miracle-tv-shared/graphql";
import React from "react";
import { Link } from "miracle-tv-client/components/ui/Link";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";
import {
  AspectRatio,
  Box,
  Image,
  Flex,
  SimpleGrid,
  SimpleGridProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Panel } from "../Panel";
import { GamepadIcon } from "miracle-tv-client/components/icons/GamepadIcon";
import { getMediaURL } from "miracle-tv-shared/media";

type ActivityGridItem =
  | Pick<Activity, "id" | "name" | "icon" | "image">
  | AdminActivityFragmentFragment;

type Props = {
  activities: ActivityGridItem[];
  actions?: (ac: ActivityGridItem) => React.ReactNode;
  getHref?: (ac: ActivityGridItem) => string;
} & SimpleGridProps;

const EmtpyWrapper = (props: any) => <React.Fragment {...props} />;

export const ActivityGrid = ({
  activities,
  getHref,
  actions,
  ...props
}: Props) => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const iconColor = useColorModeValue("primary.500", "primary.200");
  const Wrapper = getHref ? Link : EmtpyWrapper;
  return (
    <SimpleGrid columns={isMobile ? 2 : 5} spacing={6} {...props}>
      {activities.map((ac) => (
        <Panel
          position="relative"
          p={0}
          m={0}
          _hover={{ borderColor: "primary.200" }}
        >
          <Wrapper key={ac.id} href={getHref?.(ac)}>
            <Box>
              <AspectRatio ratio={8 / 12}>
                <>
                  {!ac.image && (
                    <Flex w="100%" h="100%" justify="center" align="center">
                      <GamepadIcon
                        aria-label="No game cover"
                        color={iconColor}
                        w="50%"
                        h="50$"
                      />
                    </Flex>
                  )}
                  {ac.image && <Image src={getMediaURL(ac.image.filename)} />}
                </>
              </AspectRatio>
              <Flex
                position="absolute"
                bottom={0}
                right={0}
                backgroundColor="primary.500"
                py={1}
                px={2}
              >
                <Text color="white">{ac.name}</Text>
              </Flex>
            </Box>
          </Wrapper>
          {actions && (
            <Flex position="absolute" top={0} right={0} zIndex={2}>
              {actions?.(ac)}
            </Flex>
          )}
        </Panel>
      ))}
    </SimpleGrid>
  );
};
