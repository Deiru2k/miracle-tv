import { Heading } from "@chakra-ui/layout";
import { FormGroup } from "miracle-tv-client/components/form/FormGroup";
import { CopyField } from "miracle-tv-client/components/ui/CopyField";
import { getInstanceUrl } from "miracle-tv-client/utils/instance";
import { useTranslation } from "react-i18next";

type Props = {
  channelId: string;
};

export const ChatOverlaySettings = ({ channelId }: Props) => {
  const { t: tChannel } = useTranslation("channel");
  return (
    <>
      <Heading mb={4}>{tChannel("overlay-chat-title")}</Heading>
      <FormGroup
        name="chatOverlayUrl"
        label={tChannel("overlay-chat-url")}
        help={tChannel("overlay-chat-url-help")}
      >
        <CopyField value={`${getInstanceUrl()}/overlay/chat/${channelId}`} />
      </FormGroup>
    </>
  );
};
