import { FormToggle } from "miracle-tv-client/components/form/FormToggle";
import React from "react";

export const UserPreferences = () => (
  <>
    <FormToggle name="singleUserMode" label="Single User Mode" />
    <FormToggle name="useGravatar" label="Use Gravatar" />
  </>
);
