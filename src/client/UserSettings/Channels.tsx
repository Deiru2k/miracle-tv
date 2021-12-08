import React from "react";
import { gql } from "@apollo/client";
import { useUserSettingsChannelsQuery } from "miracle-tv-shared/hooks";
import { channelFragment } from "miracle-tv-client/UserSettings/const";
import {
  Box,
  Button,
  VStack,
  useDisclosure,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { CreateChannelModal } from "./CreateChannelModal";
import { useRouter } from "next/dist/client/router";
import NotFound from "src/pages/404";
import { ChannelSettingsPage } from "miracle-tv-client/UserSettings/ChannelSettingsPage";
import { Link } from "miracle-tv-client/components/ui/Link";
import { EditIcon } from "@chakra-ui/icons";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { Attract } from "miracle-tv-client/components/ui/Attract";

gql`
  query UserSettingsChannels($filter: ChannelsQueryFilter) {
    channels(filter: $filter) {
      ...UserSettingsChannelFragment
    }
  }
  ${channelFragment}
`;

export const SettingsChannelsList = () => {
  const { currentUser } = useCurrentUser();
  const createChannelDisclosure = useDisclosure();
  const { data: { channels } = {}, refetch } = useUserSettingsChannelsQuery({
    variables: {
      filter: {
        userId: currentUser?.id,
      },
    },
    skip: !currentUser,
  });

  return (
    <>
      <CreateChannelModal
        redirectUrlBase={(id) => `/settings/user/channels/${id}/details`}
        onCreate={refetch}
        {...createChannelDisclosure}
      />
      {!!channels?.length && (
        <Box position="sticky" top="0" right="0" mb={12} zIndex={2}>
          <Button float="right" onClick={createChannelDisclosure.onOpen}>
            Create channel
          </Button>
        </Box>
      )}
      {!channels?.length && (
        <Attract>
          <Heading mt={2} mb={2}>
            {"You don't seem to have any channels yet."}
          </Heading>
          <Button variant="ghost" onClick={createChannelDisclosure.onOpen}>
            Create one!
          </Button>
        </Attract>
      )}
      <VStack spacing={4} zIndex={1}>
        {channels?.map((channel) => (
          <Panel key={channel.id} width="100%">
            <Flex width="100%" justify="space-between" align="center" mb={2}>
              <Heading size="lg" mb={2}>
                {channel.name}
              </Heading>
              <Link
                as={Button}
                href={`/settings/user/channels/${channel.id}/details`}
              >
                <EditIcon aria-label="edit" />
              </Link>
            </Flex>
            {channel.activity && `${channel.activity.name} | `}
            {channel.description}
          </Panel>
        ))}
      </VStack>
    </>
  );
};

export const Channels = () => {
  const { query: { path = [] } = {} } = useRouter();

  switch (path.length) {
    case 2:
      return <SettingsChannelsList />;
    case 3:
      return <ChannelSettingsPage channelId={path[0]} />;
    case 4:
      return <ChannelSettingsPage channelId={path[2]} tab={path[3]} />;
    default:
      return <NotFound />;
  }
};
