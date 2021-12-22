import React, { useCallback } from "react";
import { gql } from "@apollo/client";
import { Box, Button, Flex, Heading, useToast } from "@chakra-ui/react";
import { useSettingsChangePasswordMutation } from "miracle-tv-shared/hooks";
import { ChangePasswordInput } from "miracle-tv-shared/graphql";
import { Form } from "react-final-form";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { Panel } from "miracle-tv-client/components/ui/Panel";

gql`
  mutation SettingsChangePassword($input: ChangePasswordInput) {
    changeSelfPassword(input: $input)
  }
`;

export const ChangePassword = () => {
  const toast = useToast();
  const [changePasswordMutation, { loading: isChanging }] =
    useSettingsChangePasswordMutation({
      onCompleted: () =>
        toast({ status: "success", title: "Updated user info!" }),
      onError: () =>
        toast({ status: "error", title: "Error updating user info." }),
    });

  const changePassword = useCallback(
    (values: ChangePasswordInput) => {
      changePasswordMutation({ variables: { input: values } });
    },
    [changePasswordMutation]
  );

  return (
    <>
      <Heading as="h3" size="md" mb={6}>
        Change Password
      </Heading>
      <Panel>
        <Form<ChangePasswordInput> onSubmit={changePassword}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormInput
                name="currentPassword"
                label="Current Password"
                mb={4}
              />
              <FormInput name="newPassword" label="New Password" />
              <Flex mt={4}>
                <Button ml="auto" type="submit" isLoading={isChanging}>
                  Change
                </Button>
              </Flex>
            </form>
          )}
        </Form>
      </Panel>
    </>
  );
};
