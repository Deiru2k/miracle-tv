import { gql } from "@apollo/client";
import { Button, IconButton } from "@chakra-ui/button";
import { RepeatIcon } from "@chakra-ui/icons";
import { Flex, FlexProps } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { CopyField } from "miracle-tv-client/components/ui/CopyField";
import {
  PasswordResetMethod,
  PasswordResetStatus,
} from "miracle-tv-shared/graphql";
import { useResetPasswordMutation } from "miracle-tv-shared/hooks";
import { useCallback, useEffect, useState } from "react";

type Props = {
  userId: string;
  isDisabled?: boolean;
} & FlexProps;

gql`
  mutation ResetPassword($id: ID!, $input: ResetUserPasswordInput!) {
    resetUserPassword(id: $id, input: $input) {
      status
      data
    }
  }
`;

export const ResetPasswordField = ({
  userId,
  isDisabled = false,
  ...props
}: Props) => {
  const toast = useToast();
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    return () => {
      setPassword("");
    };
  }, []);

  const [resetUserPasswordMutation, { loading: isPasswordResetting }] =
    useResetPasswordMutation({
      onCompleted({ resetUserPassword: { status, data } }) {
        if (status === PasswordResetStatus.Success) {
          setPassword(data);
          toast({ status: "success", title: "Reset user password!" });
        }
      },
      onError() {
        toast({
          status: "error",
          title: "There was an error resetting password",
        });
      },
    });

  const onPasswordReset = useCallback(() => {
    resetUserPasswordMutation({
      variables: {
        id: userId,
        input: {
          method: PasswordResetMethod.Echo,
        },
      },
    });
  }, [resetUserPasswordMutation, userId]);

  return (
    <Flex {...props}>
      <CopyField
        value={password}
        w="100%"
        isDisabled={isDisabled}
        placeholder="New password will appear here."
      />
      <IconButton
        ml={2}
        aria-label="Reset User Password"
        icon={<RepeatIcon />}
        onClick={onPasswordReset}
        isLoading={isPasswordResetting}
        isDisabled={isPasswordResetting || isDisabled}
      >
        Reset password
      </IconButton>
    </Flex>
  );
};
