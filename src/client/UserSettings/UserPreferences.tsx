import { FormToggle } from "miracle-tv-client/components/form/FormToggle";
import React, { useCallback, useMemo } from "react";

import { gql } from "@apollo/client";
import {
  useUpdateUserSettingsPreferencesMutation,
  useUserSettingsPreferencesQuery,
} from "miracle-tv-shared/hooks";
import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { Form } from "react-final-form";
import { UpdateUserSettingsInput } from "miracle-tv-shared/graphql";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { FormSelfChannelSelect } from "miracle-tv-client/components/form/selects/FormSelfChannelSelect";
import Head from "next/head";

gql`
  query UserSettingsPreferences {
    userSettings {
      id
      useGravatar
      singleUserMode
      featureInDirectory
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
      featureInDirectory
      singleUserChannel {
        id
      }
    }
  }
`;

export const UserPreferences = () => {
  const toast = useToast();

  const { data } = useUserSettingsPreferencesQuery();
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
            featureInDirectory: data?.userSettings?.featureInDirectory,
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
      <Head>
        <title>User preferences - Miracle TV</title>
      </Head>
      <Heading as="h3" size="md" mb={6}>
        Profile preferences
      </Heading>
      <Form<UpdateUserSettingsInput>
        onSubmit={updateSettings}
        initialValues={formData}
      >
        {({ handleSubmit, values, dirty }) => (
          <form onSubmit={handleSubmit}>
            <Panel>
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
                mb={4}
              />
              <FormToggle
                name="featureInDirectory"
                label="Feature in User Directory"
                help={`If enabled, your profile will be featured in the "Users" page on the dashboard`}
              />
            </Panel>
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
    </>
  );
};
