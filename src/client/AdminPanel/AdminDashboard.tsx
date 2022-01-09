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
import {
  useAdminDashboardSystemLoadQuery,
  useAdminDashboardUserStatsQuery,
} from "miracle-tv-shared/hooks";
import React, { useContext } from "react";
import { LiveUpdateContext } from "miracle-tv-client/context/liveUpdate";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { ProgressWithLabel } from "miracle-tv-client/components/ui/ProgressWithLabel";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { Loading } from "miracle-tv-client/components/ui/Loading";

gql`
  query AdminDashboardUserStats {
    userStats {
      userCount
      channelCount
      streamKeyCount
      sessionCount
    }
  }
  query AdminDashboardSystemLoad {
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
      networkUp
      networkDown
    }
  }
`;

export const AdminDashboard = () => {
  const { isLiveUpdate } = useContext(LiveUpdateContext);
  const isMobile = useMediaQuery(MediaQuery.mobile);

  const { data: { systemLoad } = {}, loading: isSystemLoading } =
    useAdminDashboardSystemLoadQuery({
      fetchPolicy: "network-only",
      pollInterval: isLiveUpdate ? 5000 : 0,
    });
  const { data: { userStats } = {}, loading: isStatsLoading } =
    useAdminDashboardUserStatsQuery({
      fetchPolicy: "network-only",
      pollInterval: isLiveUpdate ? 5000 : 0,
    });

  return (
    <>
      <Flex justify="space-between" mb={2}>
        <Box>&nbsp;</Box>
        {isLiveUpdate && <Text>Updating every 5 seconds</Text>}
      </Flex>
      <SimpleGrid columns={isMobile ? 1 : 2} spacing={4}>
        <Panel position="relative">
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
              label={`${systemLoad?.cpuPercentage || 0}%`}
              isIndeterminate={isSystemLoading}
              w="100%"
              colorScheme="primary"
              height="1.4rem"
              value={systemLoad?.cpuPercentage || 0}
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
              label={`${systemLoad?.usedMem || 0} MB / ${
                systemLoad?.totalMem || 0
              } MB (${systemLoad?.memPercentage || 0}%)`}
              isIndeterminate={isSystemLoading}
              w="100%"
              colorScheme="primary"
              height="1.4rem"
              value={systemLoad?.memPercentage || 0}
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
              label={`${systemLoad?.usedDrive || 0} GB / ${
                systemLoad?.totalDrive || 0
              } GB (${systemLoad?.drivePercentage || 0}%)`}
              w="100%"
              isIndeterminate={isSystemLoading}
              colorScheme="primary"
              bgColor="primary.400"
              height="1.4rem"
              value={systemLoad?.drivePercentage}
              mb={2}
              textProps={{ color: "white" }}
            />
            <Box w="100%">
              <Text>
                Media Storage Size:{" "}
                {(systemLoad?.mediaDirSize || 0.0).toFixed(2)}Gb
              </Text>
              <Text>
                DB Storage Size: {(systemLoad?.dbSize || 0).toFixed(2)}Gb
              </Text>
              <Text>
                Total App Storage Size:{" "}
                {(
                  (systemLoad?.mediaDirSize || 0) + (systemLoad?.dbSize || 0)
                ).toFixed(2)}
                Gb
              </Text>
            </Box>
          </Flex>
        </Panel>
        <Panel position="relative">
          {isStatsLoading && <Loading position="absolute" w="100%" h="100%" />}
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
        <Panel>
          <Heading size="lg" mb={2}>
            Network stats
          </Heading>
          <Divider mb={4} />
          <Box w="100%">
            <Flex align="center" mb={2}>
              <Badge colorScheme="primary" mr={2} fontSize="1.1rem">
                Down bandwidth
              </Badge>
              <Text>{systemLoad?.networkDown || 0}</Text>
            </Flex>
            <Flex align="center" mb={2}>
              <Badge colorScheme="primary" mr={2} fontSize="1.1rem">
                Up bandwidth
              </Badge>
              <Text>{systemLoad?.networkUp || 0}</Text>
            </Flex>
          </Box>
        </Panel>
      </SimpleGrid>
    </>
  );
};
