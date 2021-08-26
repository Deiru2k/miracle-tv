import { Box, Button, Flex, Link, useToast } from "@chakra-ui/react";
import { Form } from "react-final-form";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { gql } from "@apollo/client";
import { useSignInMutation } from "miracle-tv-shared/hooks";
import { useCallback } from "react";
import { useRouter } from "next/dist/client/router";

gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(input: { username: $username, password: $password }) {
      token
      expiresAt
    }
  }
`;

const LoginPage = () => {
  const toast = useToast();
  const { push } = useRouter();
  const [signInMutation, { loading: isSignInLoading }] = useSignInMutation({
    onCompleted: ({ signIn: { token, expiresAt } }) => {
      localStorage.setItem("token", token);
      push("/");
    },
    onError: (e) => {
      toast({ status: "error", title: e.message });
    },
  });
  const signIn = useCallback(
    (values: { username: string; password: string }) => {
      signInMutation({ variables: values });
    },
    [signInMutation]
  );

  return (
    <>
      <Flex
        w="100%"
        h="100%"
        justify="center"
        align="center"
        direction="column"
      >
        <Form onSubmit={signIn}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormInput name="username" mb={4} label="Username" hideLabel />
              <FormInput
                name="password"
                type="password"
                mb={4}
                label="Password"
                hideLabel
              />
              <Button w="100%" type={"submit"}>
                Login
              </Button>
              <Box mt={6}>
                <Link href="/auth/sign-up">Sign Up</Link>
              </Box>
            </form>
          )}
        </Form>
      </Flex>
    </>
  );
};

export default LoginPage;
