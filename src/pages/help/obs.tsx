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
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const OBSHelp = () => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const { publishURL } = useServerConfig();
  return (
    <Box p={2} overflowY="auto" h="100%">
      <Heading mb={2}>Help: Setting up OBS</Heading>
      <Divider mb={4} />
      <Flex mb={4} direction={isMobile ? "column" : "row"}>
        <SimpleGrid columns={2} spacing={2} w="100%" flex={1}>
          <AspectRatio ratio={16 / 9} w="100%" h="100%">
            <Link href="/images/guide/obs/00.png" target="_blank">
              <Image src="/images/guide/obs/00.png" />
            </Link>
          </AspectRatio>
          <AspectRatio ratio={16 / 9} w="100%" h="100%">
            <Link href="/images/guide/obs/01.png" target="_blank">
              <Image src="/images/guide/obs/01.png" />
            </Link>
          </AspectRatio>
        </SimpleGrid>
        <Box flex={1} p={2}>
          <Heading size="md" mb={2}>
            1. Setup RTMP server
          </Heading>
          <Text>
            To setup RTMP, open OBS settings and go to "Stream" tab. From there,
            click on "Service" dropdown and select "Custom..." from the list
          </Text>
        </Box>
      </Flex>
      <Flex mb={4} direction={isMobile ? "column" : "row"}>
        <Box flex={1} p={2} order={isMobile ? 2 : undefined}>
          <Heading size="md" mb={2}>
            2. Obtain RTMP Server URL and input it into OBS
          </Heading>
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
        <SimpleGrid
          columns={2}
          spacing={2}
          w="100%"
          flex={1}
          order={isMobile ? 1 : undefined}
        >
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
      </Flex>
      <Flex mb={4} direction={isMobile ? "column" : "row"}>
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
          <Heading size="md" mb={4}>
            3. Obtain a stream key and input it into OBS
          </Heading>
          <Text>
            To obtain a stream key, go to your channel settings, and then to
            "Keys" tab. Generate a stream key by pressing{" "}
            <Button>Generate</Button> button, giving it a name, and then clic on{" "}
            <Button>Generate</Button> in the modal window. Then, click on{" "}
            <IconButton icon={<CopyIcon />} aria-label="Copy" /> to copy your
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

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navbar"])),
    },
  };
}
