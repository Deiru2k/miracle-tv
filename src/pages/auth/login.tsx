import { Box, Button, Flex, Link, useToast } from "@chakra-ui/react";
import { Form } from "react-final-form";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { gql } from "@apollo/client";
import { useSignInMutation } from "miracle-tv-shared/hooks";
import React, { useCallback } from "react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

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

  const { t: tCommon } = useTranslation("common");

  const { push } = useRouter();
  const [signInMutation] = useSignInMutation({
    onCompleted: ({ signIn: { token } }) => {
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
      <Head>
        <title>{tCommon("auth-login")} - Miracle TV</title>
      </Head>
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
              <FormInput
                name="username"
                mb={4}
                label={tCommon("auth-username")}
                hideLabel
              />
              <FormInput
                name="password"
                type="password"
                mb={4}
                label={tCommon("auth-password")}
                hideLabel
              />
              <Button w="100%" type={"submit"}>
                {tCommon("auth-login")}
              </Button>
              <Box mt={6}>
                <Link href="/auth/sign-up">{tCommon("auth-sign-up")}</Link>
              </Box>
            </form>
          )}
        </Form>
      </Flex>
    </>
  );
};

export default LoginPage;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "auth"])),
    },
  };
}
