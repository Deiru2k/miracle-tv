import { Box, Button, Flex, Link, useToast } from "@chakra-ui/react";
import { Form } from "react-final-form";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { gql } from "@apollo/client";
import { useSignInMutation, useSignUpMutation } from "miracle-tv-shared/hooks";
import React, { useCallback } from "react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

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

  const { t: tCommon } = useTranslation("common");

  const { push } = useRouter();
  const [signUpMutation, { loading: isSignInLoading }] = useSignUpMutation({
    onCompleted: ({ signUp: { username } }) => {
      toast({
        status: "success",
        title: tCommon("auth-sign-up-welcome", { name: username }),
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
                label={tCommon("auth-username")}
                help={tCommon("auth-username-help")}
                hideLabel
              />
              <FormInput
                name="password"
                type="password"
                help={tCommon("auth-password-help")}
                mb={4}
                isRequired
                label={tCommon("auth-password")}
                hideLabel
              />
              <FormInput
                name="email"
                type="email"
                mb={4}
                isRequired
                label={tCommon("email")}
                hideLabel
              />
              <Button w="100%" type={"submit"}>
                {tCommon("auth-sign-up")}
              </Button>
              <Box width="100%" mt={4}>
                <Link href="/auth/login">{tCommon("auth-login")}</Link>
              </Box>
            </form>
          )}
        </Form>
      </Flex>
    </>
  );
};

export default SignUpPage;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navbar"])),
    },
  };
}
