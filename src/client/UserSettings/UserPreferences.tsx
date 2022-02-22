import { FormToggle } from "miracle-tv-client/components/form/FormToggle";
import React, { useCallback, useMemo } from "react";

import { gql } from "@apollo/client";
import {
  useUpdateUserSettingsPreferencesMutation,
  useUserSettingsPreferencesQuery,
} from "miracle-tv-shared/hooks";
import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { Form } from "react-final-form";
import { AccessUnit, UpdateUserSettingsInput } from "miracle-tv-shared/graphql";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { FormSelfChannelSelect } from "miracle-tv-client/components/form/selects/FormSelfChannelSelect";
import Head from "next/head";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { useTranslation } from "react-i18next";

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
  const { checkRights } = useCurrentUser();

  const { t: tSettings } = useTranslation("settings");

  const canViewChannels = useMemo(
    () => checkRights(AccessUnit.Self, "channels"),
    [checkRights]
  );

  const { data } = useUserSettingsPreferencesQuery();
  const [updateSettingsMutation, { loading: isUpdating }] =
    useUpdateUserSettingsPreferencesMutation({
      onCompleted: () =>
        toast({
          status: "success",
          title: tSettings("preferences-update-success"),
        }),
      onError: () =>
        toast({
          status: "error",
          title: tSettings("preferences-update-error"),
        }),
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
        <title>{tSettings("ui-preferences")} - Miracle TV</title>
      </Head>
      <Heading as="h3" size="md" mb={6}>
        {tSettings("ui-preferences")}
      </Heading>
      <Form<UpdateUserSettingsInput>
        onSubmit={updateSettings}
        initialValues={formData}
      >
        {({ handleSubmit, values, dirty }) => (
          <form onSubmit={handleSubmit}>
            <Panel>
              {canViewChannels && (
                <>
                  <FormToggle
                    name="singleUserMode"
                    label={tSettings("preferences-single-user-mode")}
                    help={tSettings("preferences-single-user-mode-help")}
                    mb={4}
                  />
                  {values.singleUserMode && (
                    <FormSelfChannelSelect
                      name="singleUserChannel"
                      help={tSettings("preferences-single-user-channel-help")}
                      mb={4}
                    />
                  )}
                </>
              )}
              <FormToggle
                name="useGravatar"
                label={tSettings("preferences-use-gravatar")}
                help={tSettings("preferences-use-gravatar-help")}
                mb={4}
              />
              <FormToggle
                name="featureInDirectory"
                label={tSettings("preferences-feature-directory")}
                help={tSettings("preferences-feature-directory-help")}
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
                {tSettings("preferences-update")}
              </Button>
            </Box>
          </form>
        )}
      </Form>
    </>
  );
};
