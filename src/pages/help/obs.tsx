import { Button, IconButton } from "@chakra-ui/button";
import { CopyIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import {
  AspectRatio,
  Box,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/layout";
import { CopyField } from "miracle-tv-client/components/ui/CopyField";
import { Link } from "miracle-tv-client/components/ui/Link";
import { useServerConfig } from "miracle-tv-client/hooks/serverConfig";

const OBSHelp = () => {
  const { publishURL } = useServerConfig();
  return (
    <Box p={2} overflowY="auto" h="100%">
      <Heading mb={2}>Help: Setting up OBS</Heading>
      <Divider mb={4} />
      <Heading size="md" mb={2}>
        1. Setup RTMP server
      </Heading>
      <Flex align="center" mb={4}>
        <AspectRatio ratio={16 / 9} w="100%" h="100%" flex={1}>
          <Link href="/images/guide/obs/01.png" target="_blank">
            <Image src="/images/guide/obs/01.png" />
          </Link>
        </AspectRatio>
        <Text flex={1} p={2}>
          To setup RTMP, open OBS settings and go to "Stream" tab. From there,
          click on "Service" dropdown and select "Custom..." from the list
        </Text>
      </Flex>
      <Heading size="md" mb={2}>
        2. Obtain RTMP Server URL and input it into OBS
      </Heading>
      <Flex align="center" mb={4}>
        <SimpleGrid columns={2} spacing={2} w="100%" flex={1}>
          <AspectRatio ratio={16 / 9} w="100%" h="100%">
            <Link href="/images/guide/obs/02.png" target="_blank">
              <Image src="/images/guide/obs/02.png" />
            </Link>
          </AspectRatio>
          <AspectRatio ratio={16 / 9} w="100%" h="100%">
            <Link href="/images/guide/obs/03.png" target="_blank">
              <Image src="/images/guide/obs/03.png" />
            </Link>
          </AspectRatio>
        </SimpleGrid>
        <Box flex={1} p={2}>
          <Text mb={2}>
            To obtain server URL, go to your channel settings, and then to
            "Keys" tab. Your server URL should be there. You can copy it by
            clicking on <IconButton icon={<CopyIcon />} aria-label="Copy" />{" "}
            Alternatively, you can copy it from here:
          </Text>
          <CopyField value={publishURL} />
          <Text mt={2}>
            Then, go back to OBS and input it into "Server" field
          </Text>
        </Box>
      </Flex>
      <Heading size="md" mb={2}>
        3. Obtain a stream key and input it into OBS
      </Heading>
      <Flex align="center">
        <SimpleGrid columns={2} spacing={2} w="100%" flex={1}>
          <AspectRatio ratio={16 / 9} w="100%" h="100%">
            <Link href="/images/guide/obs/04.png" target="_blank">
              <Image src="/images/guide/obs/04.png" />
            </Link>
          </AspectRatio>
          <AspectRatio ratio={16 / 9} w="100%" h="100%">
            <Link href="/images/guide/obs/05.png" target="_blank">
              <Image src="/images/guide/obs/05.png" />
            </Link>
          </AspectRatio>
          <AspectRatio ratio={16 / 9} w="100%" h="100%">
            <Link href="/images/guide/obs/06.png" target="_blank">
              <Image src="/images/guide/obs/06.png" />
            </Link>
          </AspectRatio>
          <AspectRatio ratio={16 / 9} w="100%" h="100%">
            <Link href="/images/guide/obs/07.png" target="_blank">
              <Image src="/images/guide/obs/07.png" />
            </Link>
          </AspectRatio>
        </SimpleGrid>
        <Box flex={1} p={2}>
          <Text>
            To obtain a stream key, go to your channel settings, and then to
            "Keys" tab. Generate a stream key by pressing{" "}
            <Button>Generate</Button> button, giving it a name, and then
            clicking <Button>Generate</Button> in the modal window. Then, click
            on <IconButton icon={<CopyIcon />} aria-label="Copy" /> to copy your
            new key. Once you've copied your key, go back to OBS and insert the
            key into "Stream Key" field.
          </Text>
        </Box>
      </Flex>
      <Heading size="md" mb={2}>
        4. Stream!
      </Heading>
      <Text>
        You're all set! After you've done this, all that's left is to setup your
        OBS scene and start streaming!
      </Text>
    </Box>
  );
};

export default OBSHelp;
