import { Heading } from "@chakra-ui/layout";
import { FormGroup } from "miracle-tv-client/components/form/FormGroup";
import { CopyField } from "miracle-tv-client/components/ui/CopyField";

type Props = {
  channelId: string;
};

export const ChatOverlaySettings = ({ channelId }: Props) => {
  const port = location.port !== "" ? `:${location.port}` : "";
  return (
    <>
      <Heading mb={4}>Chat overlay</Heading>
      <FormGroup
        name="chatOverlayUrl"
        label="Chat Overlay URL"
        help="You can use this with OBS's built-in browser to display chat on your stream"
      >
        <CopyField
          value={`${location.protocol}//${location.hostname}${port}/overlay/chat/${channelId}`}
        />
      </FormGroup>
    </>
  );
};
