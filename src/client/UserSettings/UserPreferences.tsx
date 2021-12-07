import { FormToggle } from "miracle-tv-client/components/form/FormToggle";
import React, { useCallback, useMemo } from "react";

import { gql } from "@apollo/client";
import {
  useUpdateUserSettingsPreferencesMutation,
  useUserSettingsPreferencesQuery,
} from "miracle-tv-shared/hooks";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { Form } from "react-final-form";
import { UpdateUserSettingsInput } from "miracle-tv-shared/graphql";

gql`
  query UserSettingsPreferences {
    userSettings {
      id
      useGravatar
      singleUserMode
    }
  }
  mutation UpdateUserSettingsPreferences($input: UpdateUserSettingsInput!) {
    updateUserSettings(input: $input) {
      id
      useGravatar
      singleUserMode
    }
  }
`;

export const UserPreferences = () => {
  const toast = useToast();

  const { data, loading } = useUserSettingsPreferencesQuery();
  const [updateSettingsMutation, { loading: isUpdating }] =
    useUpdateUserSettingsPreferencesMutation({
      onCompleted: () =>
        toast({ status: "success", title: "Updated user info!" }),
      onError: () =>
        toast({ status: "error", title: "Error updating user info." }),
    });

  const formData = useMemo(
    () =>
      data?.userSettings
        ? {
            useGravatar: data?.userSettings?.useGravatar,
            singleUserMode: data?.userSettings?.singleUserMode,
          }
        : {},
    [data]
  );

  const updateSettings = useCallback(
    (values: UpdateUserSettingsInput) => {
      updateSettingsMutation({ variables: { input: values } });
    },
    [updateSettingsMutation]
  );

  return (
    <Form<UpdateUserSettingsInput>
      onSubmit={updateSettings}
      initialValues={formData}
    >
      {({ handleSubmit, dirty }) => (
        <form onSubmit={handleSubmit}>
          <FormToggle name="singleUserMode" label="Single User Mode" />
          <Text mb={5}>
            {
              "If enabled, your user is limited to having only one channel. Userful if you don't need to manage extra channels."
            }
          </Text>
          <FormToggle name="useGravatar" label="Use Gravatar" />
          <Text mb={5}>
            {
              "If enabled, profile picture will use Gravatar instead of currently uploaded image"
            }
          </Text>
          <Box
            display="inline-block"
            position="sticky"
            float="right"
            bottom={0}
          >
            <Button
              type="submit"
              mt={6}
              isLoading={isUpdating}
              isDisabled={!dirty}
            >
              Update Settings
            </Button>
          </Box>
        </form>
      )}
    </Form>
  );
};
