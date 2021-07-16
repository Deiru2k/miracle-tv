import React, { useCallback } from "react";
import { gql } from "@apollo/client";
import { Box, Button, Flex } from "@chakra-ui/react";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { Form } from "react-final-form";
import { SignInInput } from "miracle-tv-shared/graphql";
import {
  useCurrentUserFullLazyQuery,
  useSignInMutation,
} from "miracle-tv-shared/hooks";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { useRouter } from "next/dist/client/router";

gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      token
      expiresAt
    }
  }
  query LoginSelfInfo {
    self {
      username
      displayName
      emailHash
      singleUserMode
      roles {
        name
      }
      channels {
        id
        activity {
          name
        }
        slug
        name
      }
    }
  }
`;

type LoginFormProps = {
  onSubmit?: (values: SignInInput) => void;
  isLoading?: boolean;
};

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => (
  <Form<SignInInput> onSubmit={onSubmit}>
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <FormInput
          name="username"
          mb={5}
          inputProps={{ placeholder: "Username" }}
        />
        <FormInput
          name="password"
          type="password"
          mb={6}
          inputProps={{ placeholder: "Password" }}
        />
        <Button type="submit" width="100%" isLoading={isLoading}>
          Login
        </Button>
      </form>
    )}
  </Form>
);

const Login = () => {
  const { push } = useRouter();
  const { updateUser } = useCurrentUser();
  const [loadSelfInfo, { loading }] = useCurrentUserFullLazyQuery({
    onCompleted: ({ self }) => {
      updateUser(self);
      push("/dashboard");
    },
  });
  const [signIn, signInState] = useSignInMutation({
    onCompleted: ({ signIn: { token } }) => {
      localStorage.setItem("token", token);
      loadSelfInfo();
    },
    onError: (res) => {
      console.error(res);
    },
  });
  const onSubmit = useCallback(
    (values: SignInInput) => {
      signIn({ variables: { input: values } });
    },
    [signIn]
  );
  return (
    <Flex w="100%" h="100%" align="center" justify="center">
      <Box w={60}>
        <LoginForm
          onSubmit={onSubmit}
          isLoading={loading || signInState.loading}
        />
      </Box>
    </Flex>
  );
};

export default Login;
