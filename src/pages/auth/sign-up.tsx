import { Box, Button, Flex, Link, useToast } from "@chakra-ui/react";
import { Form } from "react-final-form";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { gql } from "@apollo/client";
import { useSignInMutation, useSignUpMutation } from "miracle-tv-shared/hooks";
import React, { useCallback } from "react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

gql`
  mutation SignUp($username: String!, $password: String!, $email: String!) {
    signUp(input: { username: $username, password: $password, email: $email }) {
      id
      username
    }
  }
`;

const SignUpPage = () => {
  const toast = useToast();
  const { push } = useRouter();
  const [signUpMutation, { loading: isSignInLoading }] = useSignUpMutation({
    onCompleted: ({ signUp: { id, username } }) => {
      toast({
        status: "success",
        title: `Welcome, ${username}!\nYou may now login with your credentials.`,
      });
      push("/auth/login");
    },
    onError: (e) => {
      toast({ status: "error", title: e.message });
    },
  });
  const signUp = useCallback(
    (values: { username: string; password: string; email: string }) => {
      signUpMutation({ variables: values });
    },
    [signUpMutation]
  );

  return (
    <>
      <Head>
        <title>Sign Up - Miracle TV</title>
      </Head>
      <Flex
        w="100%"
        h="100%"
        justify="center"
        align="center"
        direction="column"
      >
        <Form onSubmit={signUp}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormInput
                name="username"
                mb={4}
                isRequired
                label="Username"
                help="This cannot be changed later! Please, choose wisely."
                hideLabel
              />
              <FormInput
                name="password"
                type="password"
                help="Recommended is minimum of 8 characters, with letters, numbers and symbols."
                mb={4}
                isRequired
                label="Password"
                hideLabel
              />
              <FormInput
                name="email"
                type="email"
                mb={4}
                isRequired
                label="E-mail"
                hideLabel
              />
              <Button w="100%" type={"submit"}>
                Sign Up
              </Button>
              <Box width="100%" mt={4}>
                <Link href="/auth/login">Log in</Link>
              </Box>
            </form>
          )}
        </Form>
      </Flex>
    </>
  );
};

export default SignUpPage;
