import { gql } from "@apollo/client";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useHomeChannelsQuery } from "miracle-tv-shared/hooks";

gql`
  query HomeChannels {
    channels {
      name
      activity {
        name
      }
      description
    }
  }
`;

const Home = () => {
  const { data, loading } = useHomeChannelsQuery();
  return (
    <Flex w="100%" minH="100%" align="center" direction="column" p={6}>
      {data &&
        !loading &&
        data?.channels?.map((channel: any) => (
          <Box
            p={3}
            mb={3}
            bgColor="lightgrey"
            color="black"
            borderRadius="15px"
            key={channel.id}
            w="30vw"
          >
            <Text mb={3}>Channel: {channel?.name}</Text>
            <Text>Activity: {channel?.activity?.name}</Text>
          </Box>
        ))}
    </Flex>
  );
};

export default Home;
