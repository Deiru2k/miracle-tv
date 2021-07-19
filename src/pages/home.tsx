import React from "react";
import { gql } from "@apollo/client";
import { Box, Grid, Flex, GridItem, Heading, Text } from "@chakra-ui/layout";
import { Button, ButtonGroup, Divider } from "@chakra-ui/react";
import { StreamPreview } from "miracle-tv-client/components/ui/StreamPreview";
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

const liveStreams = [1, 2, 3, 4, 5];
const activeToday = [1, 2, 3, 4, 5, 6, 7, 8];

const Home = () => {
  return (
    <>
      {/*<Heading mb={4} width="100%" size="xl">
        Community Spotlight
      </Heading>
      <Flex direction="row">
        <StreamPreview
          w="50vw"
          flexShrink={0}
          name={"Dale's amazing stream"}
          hideInfo
          hideThumbnail
          autoplay
        />
        <Box ml={4} mb={2} flex="auto">
          <Flex align="center">
            <Heading size="lg" height="100%" lineHeight="20px">
              {"Dale's Amazing Stream"}
            </Heading>
            <Flex
              display="flex"
              align="center"
              justify="center"
              color="red"
              ml={2}
              fontSize="35px"
              lineHeight="20px"
            >
              ●
            </Flex>
          </Flex>
          <Flex flex="auto" justify="space-between">
            <Text size="md" mb={2} mt={2}>
              Viewers: 420, Followers: 1337
            </Text>
            <Text size="md" mb={2} mt={2}>
              Playing A Video Game
            </Text>
          </Flex>
          <Divider mb={4} />
          <Box mb={4}>
            <Text>
              Vivamus vel odio vulputate, elementum erat eu, egestas augue.
              Nullam volutpat dignissim lectus, ut sagittis velit aliquet at.
              Fusce ut finibus enim. Quisque suscipit mollis lectus, a
              vestibulum quam mollis id. Nullam quis convallis massa. Quisque
              iaculis odio quis felis sagittis rutrum. Pellentesque pretium mi
              eget blandit pulvinar. Nulla bibendum porttitor congue. Phasellus
              eu mollis felis.
            </Text>
          </Box>
          <ButtonGroup>
            <Button>Watch</Button>
            <Button>Follow</Button>
          </ButtonGroup>
        </Box>
      </Flex> */}
      <Heading mb={5} mt={14} width="100%" _first={{ mt: 0 }}>
        Live Now
      </Heading>
      <Grid
        mb={10}
        gap={4}
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
      >
        {liveStreams.map((key) => (
          <GridItem key={key}>
            <StreamPreview
              alwaysShowInfo
              w="100%"
              user={{
                displayName: "Dale",
                username: "Dale",
                avatar: {
                  filename: "58ed5aec-b6a5-4fa0-b890-6fd4b84ecdfe.png",
                },
              }}
              boxSizing="border-box"
            />
          </GridItem>
        ))}
      </Grid>
      <Heading mb={5} mt={14} width="100%">
        Active Today
      </Heading>
      <Grid
        mb={10}
        gap={4}
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
      >
        {activeToday.map((key) => (
          <GridItem key={key}>
            <StreamPreview
              alwaysShowInfo
              w="100%"
              name={"Dale's amazing stream"}
              boxSizing="border-box"
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default Home;
