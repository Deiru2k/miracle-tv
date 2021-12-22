import { FormToggle } from "miracle-tv-client/components/form/FormToggle";
import React, { useCallback, useMemo } from "react";

import { gql } from "@apollo/client";
import {
  useUpdateUserSettingsPreferencesMutation,
  useUserSettingsPreferencesQuery,
} from "miracle-tv-shared/hooks";
import { Box, Button, Heading, Text, useToast } from "@chakra-ui/react";
import { Form } from "react-final-form";
import { UpdateUserSettingsInput } from "miracle-tv-shared/graphql";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { FormSelfChannelSelect } from "miracle-tv-client/components/form/selects/FormSelfChannelSelect";

gql`
  query UserSettingsPreferences {
    userSettings {
      id
      useGravatar
      singleUserMode
      singleUserChannel {
        id
      }
    }
  }
  mutation UpdateUserSettingsPreferences($input: UpdateUserSettingsInput!) {
    updateUserSettings(input: $input) {
      id
      useGravatar
      singleUserMode
      singleUserChannel {
        id
      }
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
            singleUserChannel: data?.userSettings?.singleUserChannel?.id,
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
    <>
      <Heading as="h3" size="md" mb={6}>
        Profile preferences
      </Heading>
      <Panel>
        <Form<UpdateUserSettingsInput>
          onSubmit={updateSettings}
          initialValues={formData}
        >
          {({ handleSubmit, values, dirty }) => (
            <form onSubmit={handleSubmit}>
              <FormToggle
                name="singleUserMode"
                label="Single User Mode"
                help="If enabled, your user is limited to having only one channel. Userful if you don't need to manage extra channels."
                mb={4}
              />
              {values.singleUserMode && (
                <FormSelfChannelSelect
                  name="singleUserChannel"
                  help="Select channel that you would like to use."
                  mb={4}
                />
              )}
              <FormToggle
                name="useGravatar"
                label="Use Gravatar"
                help="If enabled, profile picture will use Gravatar instead of currently uploaded image"
              />
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
      </Panel>
    </>
  );
};
