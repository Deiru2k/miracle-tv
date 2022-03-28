import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { FormToggle } from "miracle-tv-client/components/form/FormToggle";
import { UpdateChannelInput } from "miracle-tv-shared/graphql";
import { useTranslation } from "next-i18next";

type Props = {
  isDisabled?: boolean;
  values: UpdateChannelInput;
};

export const ChannelSecurityForm = ({ isDisabled, values }: Props) => {
  const { t: tChannel } = useTranslation("channel");
  return (
    <>
      <FormToggle
        label={tChannel("mature")}
        help={tChannel("mature-help")}
        name="mature"
        isDisabled={isDisabled}
        mb={2}
      />
      {values.mature && (
        <FormInput
          mt={2}
          name="matureDescription"
          label={tChannel("mature-description")}
          help={tChannel("mature-description-help")}
          mb={2}
        />
      )}
      <FormToggle
        label={tChannel("password-protected")}
        help={tChannel("password-protected-help")}
        name="passwordProtected"
        isDisabled={isDisabled}
      />
      {values.passwordProtected && (
        <FormInput
          mt={2}
          name="password"
          label={tChannel("password")}
          help={tChannel("password-help")}
        />
      )}
    </>
  );
};
