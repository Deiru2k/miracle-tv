import React, { useMemo, useCallback } from "react";
import { gql } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import {
  Box,
  BoxProps,
  Heading,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  useTabs,
} from "@chakra-ui/react";
import { useUserPageQuery } from "miracle-tv-shared/hooks";
import { UserInfo } from "miracle-tv-client/components/ui/UserInfo";
import { getMediaURL } from "miracle-tv-shared/media";
import { User } from "miracle-tv-shared/graphql";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { Page } from "miracle-tv-client/components/system/Page";
import { StreamPlayer } from "miracle-tv-client/components/player/StreamPlayer";
import { identity } from "ramda";

gql`
  query UserPage($id: ID!) {
    user(id: $id) {
      id
      username
      displayName
      emailHash
      bio
      singleUserMode
      avatar {
        id
        filename
      }
      header {
        id
        filename
      }
      streamThumbnail {
        id
        filename
      }
    }
  }
`;

type UserHeaderProps = {
  user: User;
} & BoxProps;
const UserHeader = ({ user, ...props }: UserHeaderProps) => {
  const headingColor = useColorModeValue("text.light", "text.dark");
  return (
    <Box w="100%" position="relative" zIndex={1} mb={10} {...props}>
      <Box
        w="100%"
        h={["150px", "250px", "300px", "400px"]}
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPosition="center"
        bgColor="primary.200"
        bgImage={getMediaURL(user.header?.filename)}
        zIndex={1}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        zIndex={2}
        bg={[
          "linear-gradient(0deg, rgba(0,0,0,0.8029412448573179) 0%, rgba(9,9,9,0.30154068463322825) 43%, rgba(0,0,0,0) 100%)",
          "linear-gradient(0deg, rgba(0,0,0,0.8029412448573179) 0%, rgba(9,9,9,0.30154068463322825) 43%, rgba(0,0,0,0) 100%)",
          "linear-gradient(180deg, rgba(0,0,0,0.8029412448573179) 0%, rgba(9,9,9,0.30154068463322825) 43%, rgba(0,0,0,0) 100%)",
        ]}
      />
      <Heading
        position="absolute"
        top={[undefined, undefined, 0]}
        bottom={[0, 0, undefined]}
        left={0}
        p={4}
        zIndex={3}
        color={headingColor}
      >
        <UserInfo user={user} imageHeight="3rem" fontSize="3rem" />
      </Heading>
    </Box>
  );
};

type Tab = {
  title: string;
  value: string;
  component: ({ user }: { user: User }) => JSX.Element;
};

const tabs: (singleChannelMode?: boolean) => Tab[] = (singleChannelMode) =>
  (
    [
      {
        title: "Profile",
        value: "profile",
        component: ({ user }) => (
          <Box>
            <Text whiteSpace="pre-wrap">{user?.bio}</Text>
          </Box>
        ),
      },
      {
        title: "Channel",
        value: "channel",
        component: ({ user }): JSX.Element => (
          <Box>
            <Heading size="md" mb={4}>
              {"About Dale's Amazing Channel"}
            </Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              eleifend mauris. Cras orci lectus, congue et porttitor ut, sodales
              et velit. Cras a tempus orci. Vestibulum libero metus, placerat eu
              elit sed, pharetra dapibus augue. Aliquam vel pharetra velit. Sed
              molestie pretium iaculis. Fusce finibus varius dui, quis bibendum
              nisl gravida et. Duis molestie molestie tortor, et vehicula tortor
              mollis eu. Aliquam ullamcorper ac dolor sed accumsan. In at elit
              at nunc eleifend lacinia eu at turpis. In interdum, nunc et
              bibendum blandit, leo nibh luctus tortor, a condimentum quam neque
              non nulla. Sed enim mauris, condimentum sed lacus sed, porttitor
              ullamcorper tortor. Donec varius non est eget mattis. Sed sodales
              magna nisi, et ultrices leo ornare sit amet. Donec massa dolor,
              sollicitudin quis ex a, hendrerit convallis turpis. In tellus
              diam, semper non nibh ut, mattis efficitur arcu. Vestibulum rutrum
              nisl eu varius convallis. Nullam pretium cursus orci vel congue.
              Sed dignissim urna leo. Nam leo sem, porta a tortor eu, euismod
              congue orci. Praesent leo dolor, tempor et eros sit amet, euismod
              commodo mauris. Aenean non ipsum sit amet nisl imperdiet semper.
              Maecenas tristique at lacus vitae egestas. Integer quam sem,
              auctor nec magna eu, sodales convallis arcu. Fusce eget lacinia
              purus. Integer imperdiet massa non arcu luctus, eu vulputate diam
              pellentesque. Pellentesque sollicitudin turpis vel tortor maximus,
              eu volutpat purus pellentesque. Quisque sed laoreet augue. Nam
              vehicula, ex at tempor lacinia, nibh est pretium neque, nec
              fringilla mauris lacus nec felis. Praesent viverra consequat lorem
              ut tempor. Suspendisse potenti.
            </Text>
          </Box>
        ),
      },
      !singleChannelMode && {
        title: "Channels",
        value: "channels",
        component: () => <Box>Channel List</Box>,
      },
    ] as Tab[]
  ).filter(identity);

const UserPage = () => {
  const {
    query: { id },
  } = useRouter();

  const tabController = useTabs({});

  const { data, loading } = useUserPageQuery({
    variables: { id: id as string },
  });

  const selectedTabs = useMemo(() => {
    return !data?.user ? [] : tabs(data.user?.singleUserMode);
  }, [data?.user]);

  const currentTab = useMemo(
    () => selectedTabs[tabController.selectedIndex] as Tab,
    [selectedTabs, tabController.selectedIndex]
  );
  const isChannelTab = currentTab?.value === "channel";

  const onTabChange = useCallback(
    (tabIndex: number) => {
      console.log(tabIndex);
      tabController.setSelectedIndex(tabIndex);
    },
    [tabController]
  );

  return !!data?.user ? (
    <Box>
      {isChannelTab && (
        <StreamPlayer
          user={data.user as User}
          src="/videos/kill-the-night.mp4"
        />
      )}
      {!isChannelTab && <UserHeader user={data.user as User} mb={0} />}
      <Page pt={0}>
        <Tabs index={tabController.selectedIndex} onChange={onTabChange}>
          <TabList>
            {selectedTabs.map((tab) => (
              <Tab key={tab.value}>{tab.title}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {selectedTabs.map((tab) => (
              <TabPanel key={tab.value} px={0}>
                <Panel>
                  <tab.component user={data.user as User} />
                </Panel>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Page>
    </Box>
  ) : null;
};

export default UserPage;
