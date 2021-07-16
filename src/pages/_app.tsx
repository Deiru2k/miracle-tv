import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Head from "next/head";
import { propOr } from "ramda";

import theme from "miracle-tv-client/theme";
import { Navbar } from "miracle-tv-client/components/system/Navbar";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { createUploadLink } from "apollo-upload-client";

const env = process.env.NEXT_PUBLIC_ENV;

const apiUrls: Record<string, string> = {
  development: "https://dev.miracle-tv.live/api/graphql",
  local: "http://localhost:4000/graphql",
  production: "https://miracle-tv.live/api/graphql",
} as const;

const defaultURI: string = propOr(apiUrls.local, env, apiUrls);

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_API_URL || defaultURI,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(uploadLink),
});

const noNavbarRoutes = ["/auth/login"];

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();
  const showNavbar = !noNavbarRoutes.includes(router.asPath);
  return (
    <>
      <Head>
        <title>Кофейня - Учёт</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Global
        styles={css`
          html,
          body,
          #__next {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
          }
        `}
      />
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Flex h="100%" w="100%" direction="column">
            {showNavbar && <Navbar />}
            <Box
              width="100%"
              height="100%"
              px={15}
              py={5}
              position="relative"
              overflowY="auto"
              color="white"
              bgColor="secondary.600"
            >
              <Component {...pageProps} />
            </Box>
          </Flex>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
