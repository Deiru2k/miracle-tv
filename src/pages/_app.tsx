import App from 'next/app';
import { Box, ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Head from "next/head";
import getConfig from 'next/config'
import { any, propOr } from "ramda";

import theme from "miracle-tv-shared/theme";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { createUploadLink } from "apollo-upload-client";
import { ShowcaseWrapper } from "miracle-tv-client/components/showcase/Wrapper";
import { PageWrapper } from "miracle-tv-client/components/system/Page";
import { Provider } from "react-redux";
import configureStore from "miracle-tv-client/store";
import { ThemeSwitcher } from "miracle-tv-client/components/ui/ThemeSwitcher";

const { store, persistor } = configureStore();

const env = process.env.NEXT_PUBLIC_ENV;

const { publicRuntimeConfig } = getConfig();

const apiUrls: Record<string, string> = {
  development: "https://dev.miracle-tv.live/api/graphql",
  local: `http://localhost:4000/graphql`,
  production: "https://miracle-tv.live/api/graphql",
} as const;

const defaultURI: string =
  publicRuntimeConfig?.apiUrl || propOr(apiUrls.local, env, apiUrls);

const uploadLink = createUploadLink({
  uri: defaultURI,
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

const noNavbarRoutes = ["/auth/login", "/docs", "/"];

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
            <Box position="fixed" right={0} bottom={0} pb={4} pr={4}>
              <ThemeSwitcher />
            </Box>
          </ApolloProvider>
        </Provider>
      </ChakraProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps,  }
}

export default MyApp;
