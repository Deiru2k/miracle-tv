import {
  Badge,
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import { gql } from "@apollo/client";
import { useAdminDashboardSystemLoadQuery } from "miracle-tv-shared/hooks";
import React, { useContext } from "react";
import { LiveUpdateContext } from "miracle-tv-client/context/liveUpdate";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { ProgressWithLabel } from "miracle-tv-client/components/ui/ProgressWithLabel";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";

gql`
  query AdminDashboardSystemLoad {
    userStats {
      userCount
      channelCount
      streamKeyCount
      sessionCount
    }
    systemLoad {
      cpuPercentage
      totalMem
      usedMem
      memPercentage
      totalDrive
      usedDrive
      drivePercentage
      mediaDirSize
      dbSize
    }
  }
`;

export const AdminDashboard = () => {
  const { isLiveUpdate } = useContext(LiveUpdateContext);
  const isMobile = useMediaQuery(MediaQuery.mobile);

  const { data: { systemLoad, userStats } = {} } =
    useAdminDashboardSystemLoadQuery({
      fetchPolicy: "no-cache",
      pollInterval: isLiveUpdate ? 5000 : 0,
    });

  return (
    <>
      <Flex justify="space-between" mb={2}>
        <Box>&nbsp;</Box>
        {isLiveUpdate && <Text>Updating every 5 seconds</Text>}
      </Flex>
      <SimpleGrid columns={isMobile ? 1 : 2} spacing={4}>
        <Panel>
          <Heading size="lg" mb={2}>
            System Stats
          </Heading>
          <Divider mb={4} />
          <Flex w="100%" align="center" direction="column" mb={4}>
            <Box as="span" w="100%" mb={2}>
              <Badge fontSize="1rem" colorScheme="primary">
                CPU
              </Badge>
            </Box>
            <ProgressWithLabel
              label={`${systemLoad?.cpuPercentage}%`}
              w="100%"
              colorScheme="primary"
              height="1.4rem"
              value={systemLoad?.cpuPercentage}
              textProps={{ color: "white" }}
            />
          </Flex>
          <Flex w="100%" align="center" direction="column" mb={4}>
            <Box as="span" w="100%" mb={2}>
              <Badge fontSize="1rem" colorScheme="primary">
                Memory
              </Badge>
            </Box>
            <ProgressWithLabel
              label={`${systemLoad?.usedMem} MB / ${systemLoad?.totalMem} MB (${systemLoad?.memPercentage}%)`}
              w="100%"
              colorScheme="primary"
              height="1.4rem"
              value={systemLoad?.memPercentage}
              textProps={{ color: "white" }}
            />
          </Flex>
          <Flex w="100%" align="center" direction="column" mb={4}>
            <Box as="span" w="100%" mb={2}>
              <Badge fontSize="1rem" colorScheme="primary">
                Disk
              </Badge>
            </Box>
            <ProgressWithLabel
              label={`${systemLoad?.usedDrive} GB / ${systemLoad?.totalDrive} GB (${systemLoad?.drivePercentage}%)`}
              w="100%"
              colorScheme="primary"
              bgColor="primary.400"
              height="1.4rem"
              value={systemLoad?.drivePercentage}
              mb={2}
              textProps={{ color: "white" }}
            />
            <Box w="100%">
              <Text>
                Media Storage Size: {systemLoad?.mediaDirSize.toFixed(2)}Gb
              </Text>
              <Text>DB Storage Size: {systemLoad?.dbSize.toFixed(2)}Gb</Text>
              <Text>
                Total App Storage Size:{" "}
                {(systemLoad?.mediaDirSize + systemLoad?.dbSize).toFixed(2)}Gb
              </Text>
            </Box>
          </Flex>
        </Panel>
        <Panel>
          <Heading size="lg" mb={2}>
            User stats
          </Heading>
          <Divider mb={4} />
          <Box w="100%">
            <Flex align="center" mb={2}>
              <Badge colorScheme="primary" mr={2} fontSize="1.1rem">
                Total Users:
              </Badge>
              <Text>{userStats?.userCount}</Text>
            </Flex>
            <Flex align="center" mb={2}>
              <Badge colorScheme="primary" mr={2} fontSize="1.1rem">
                Total Channels:
              </Badge>
              <Text>{userStats?.channelCount}</Text>
            </Flex>
            <Flex align="center" mb={2}>
              <Badge colorScheme="primary" mr={2} fontSize="1.1rem">
                Total Stream Keys:
              </Badge>
              <Text>{userStats?.streamKeyCount}</Text>
            </Flex>
            <Flex align="center" mb={2}>
              <Badge colorScheme="primary" mr={2} fontSize="1.1rem">
                Total Sessions:
              </Badge>
              <Text>{userStats?.sessionCount}</Text>
            </Flex>
          </Box>
        </Panel>
      </SimpleGrid>
    </>
  );
};
