import React, { useCallback } from "react";
import { gql } from "@apollo/client";

import { Heading, Box, Button, useToast, Flex } from "@chakra-ui/react";

import { Form } from "react-final-form";
import { FormInput } from "miracle-tv-client/components/form/FormInput";

import {
  CurrentUserFragment,
  UpdateUserAccountInput,
  UpdateUserInput,
} from "miracle-tv-shared/graphql";
import {
  useAccountDetailsQuery,
  useSettingsUpdateAccountMutation,
} from "miracle-tv-shared/hooks";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { useTranslation } from "next-i18next";

gql`
  query AccountDetails {
    selfAccount {
      id
      username
      email
    }
  }
  mutation ChangeAccountPassword($input: ChangePasswordInput) {
    changeSelfPassword(input: $input)
  }
  mutation SettingsUpdateAccount($input: UpdateUserAccountInput) {
    updateSelfAccount(input: $input) {
      id
      username
      email
    }
  }
`;

export const AccountDetails = () => {
  const toast = useToast();
  const { data: { selfAccount } = {} } = useAccountDetailsQuery();

  const { t: tSettings } = useTranslation("settings");
  const { t: tCommon } = useTranslation("common");

  const userFormData = {
    email: selfAccount?.email,
  };

  const [updateAccountMutation, { loading: isUpdating }] =
    useSettingsUpdateAccountMutation({
      onCompleted: () =>
        toast({
          status: "success",
          title: tSettings("account-update-success"),
        }),
      onError: () =>
        toast({ status: "error", title: tSettings("account-update-error") }),
    });

  const updateAccount = useCallback(
    (values: UpdateUserAccountInput) => {
      updateAccountMutation({ variables: { input: values } });
    },
    [updateAccountMutation]
  );

  return (
    <>
      <Heading as="h3" size="md" mb={6}>
        {tSettings("account-settings")}
      </Heading>
      <Panel>
        <Form<UpdateUserAccountInput>
          onSubmit={updateAccount}
          initialValues={userFormData}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormInput name="email" label={tCommon("email")} />
              <Flex w="100%" mt={4}>
                <Button ml="auto" type="submit" isLoading={isUpdating}>
                  {tSettings("preferences-update")}
                </Button>
              </Flex>
            </form>
          )}
        </Form>
      </Panel>
    </>
  );
};
