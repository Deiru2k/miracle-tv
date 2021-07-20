import { Box, ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Head from "next/head";
import { any, propOr } from "ramda";

import theme from "miracle-tv-shared/theme";
import { Navbar } from "miracle-tv-client/components/system/Navbar";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { createUploadLink } from "apollo-upload-client";
import { ShowcaseWrapper } from "miracle-tv-client/components/showcase/Wrapper";
import { PageWrapper } from "miracle-tv-client/components/system/Page";
import { Provider } from "react-redux";
import configureStore from "miracle-tv-client/store";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = configureStore();

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

const noNavbarRoutes = ["/auth/login", "/docs"];

function MyApp({ Component, pageProps }: any): JSX.Element {
  const router = useRouter();
  const showNavbar = !any(
    (path) => router.asPath.startsWith(path),
    noNavbarRoutes
  );
  const isShowcase = router.asPath.startsWith("/docs");
  return (
    <>
      <Head>
        <title>Miracle TV</title>
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
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <ApolloProvider client={client}>
            {!isShowcase && (
              <Flex h="100%" w="100%" direction="column">
                {showNavbar && <Navbar />}
                <PageWrapper>
                  <Component {...pageProps} />
                </PageWrapper>
              </Flex>
            )}
            {isShowcase && (
              <ShowcaseWrapper>
                <Component {...pageProps} />
              </ShowcaseWrapper>
            )}
          </ApolloProvider>
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
