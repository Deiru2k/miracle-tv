import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { FormToggle } from "miracle-tv-client/components/form/FormToggle";
import { UpdateChannelInput } from "miracle-tv-shared/graphql";

type Props = {
  isDisabled?: boolean;
  values: UpdateChannelInput;
};

export const ChannelSecurityForm = ({ isDisabled, values }: Props) => {
  return (
    <>
      <FormToggle
        label="Mature channel"
        help="This will remove channel from public pages and mark it as sensitive."
        name="mature"
        isDisabled={isDisabled}
        mb={2}
      />
      {values.mature && (
        <FormInput
          mt={2}
          name="matureDescription"
          label="Describe your content"
          help="This is optional and can be used to specify what makes you content sensitive"
          mb={2}
        />
      )}
      <FormToggle
        label="Protect with password"
        help="This will add password protection to channels"
        name="passwordProtected"
        isDisabled={isDisabled}
      />
      {values.passwordProtected && (
        <FormInput
          mt={2}
          name="password"
          label="Password"
          help="Password that channel will be protected with."
        />
      )}
    </>
  );
};
