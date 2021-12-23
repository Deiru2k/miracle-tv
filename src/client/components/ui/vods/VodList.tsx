import {
  VStack,
  Image,
  AspectRatio,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "../Link";
import { Panel } from "../Panel";
type Props = {
  columns?: number;
};

export const VodList = ({ columns = 3 }: Props) => {
  return (
    <SimpleGrid columns={columns} spacing={2}>
      <Panel href="#" w="100%" p={0}>
        <AspectRatio ratio={16 / 9}>
          <Image src="/yuuka-thumbnail.jpg" />
        </AspectRatio>
        <Heading size="sm" px={4} py={2}>
          Streamed 9 hours ago on <Link href="#">[Awesome channel]</Link>
        </Heading>
      </Panel>
      <Panel href="#" w="100%" p={0}>
        <AspectRatio ratio={16 / 9}>
          <Image src="/yuuka-thumbnail.jpg" />
        </AspectRatio>
        <Heading size="sm" px={4} py={2}>
          Streamed 9 hours ago on <Link href="#">[Awesome channel]</Link>
        </Heading>
      </Panel>
      <Panel href="#" w="100%" p={0}>
        <AspectRatio ratio={16 / 9}>
          <Image src="/yuuka-thumbnail.jpg" />
        </AspectRatio>
        <Heading size="sm" px={4} py={2}>
          Streamed 9 hours ago on <Link href="#">[Awesome channel]</Link>
        </Heading>
      </Panel>
      <Panel href="#" w="100%" p={0}>
        <AspectRatio ratio={16 / 9}>
          <Image src="/yuuka-thumbnail.jpg" />
        </AspectRatio>
        <Heading size="sm" px={4} py={2}>
          Streamed 9 hours ago on <Link href="#">[Awesome channel]</Link>
        </Heading>
      </Panel>
    </SimpleGrid>
  );
};
