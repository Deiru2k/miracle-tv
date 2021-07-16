import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { FormTextarea } from "miracle-tv-client/components/form/FormTextarea";
import { FormToggle } from "miracle-tv-client/components/form/FormToggle";
import React from "react";

export const UserEditForm = () => {
  return (
    <>
      <FormInput name="displayName" label="Display Name" mb={2} />
      <FormTextarea
        name="bio"
        label="About Me"
        mb={2}
        inputProps={{ rows: 5 }}
      />
      <FormToggle name="singleUserMode" label="Single User Mode" />
    </>
  );
};
