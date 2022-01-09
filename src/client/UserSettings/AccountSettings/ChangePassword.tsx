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
        toast({
          status: "success",
          title: "Successfully changed your password!",
        }),
      onError: () =>
        toast({
          status: "error",
          title: "There was an error changing your password.",
        }),
    });

  const changePassword = useCallback(
    (values: ChangePasswordInput) => {
      return changePasswordMutation({ variables: { input: values } });
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
          {({ handleSubmit, form }) => (
            <form
              onSubmit={(e) => {
                handleSubmit(e).then(() => {
                  form.reset();
                });
              }}
            >
              <FormInput
                name="currentPassword"
                label="Current Password"
                type="password"
                mb={4}
              />
              <FormInput
                name="newPassword"
                label="New Password"
                type="password"
              />
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
