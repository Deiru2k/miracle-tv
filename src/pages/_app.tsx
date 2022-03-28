import App from "next/app";
import { Flex } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Head from "next/head";
import getConfig from "next/config";
import { any, propOr } from "ramda";
import { appWithTranslation } from "next-i18next";

import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { createUploadLink } from "apollo-upload-client";
import { PageWrapper } from "miracle-tv-client/components/system/Page";
import { Navbar } from "miracle-tv-client/components/ui/Navbar";
import { Chakra } from "miracle-tv-client/Chakra";
import { LiveUpdateContext } from "miracle-tv-client/context/liveUpdate";
import dynamic from "next/dynamic";
import {
  LocaleContext,
  SetLocaleFromLocalStorage,
} from "miracle-tv-client/context/locale";
import { LocaleKey } from "miracle-tv-client/context/locale/const";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const SetIsLiveFromLocalStorage = dynamic(
  () =>
    import("miracle-tv-client/context/liveUpdate").then(
      (c) => c.SetIsLiveFromLocalStorage
    ) as any,
  { ssr: false, loading: () => null }
);

const env = process.env.NEXT_PUBLIC_ENV;

const { publicRuntimeConfig } = getConfig();

const apiUrls: Record<string, string> = {
  development: `${publicRuntimeConfig?.apiUrl}/graphql`,
  local: `http://localhost:4000/graphql`,
  production: `${publicRuntimeConfig?.apiUrl}/graphql`,
} as const;

const defaultURI: string =
  `${publicRuntimeConfig?.apiUrl}/graphql` ||
  propOr(apiUrls.local, env, apiUrls);

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

const noNavbarRoutes = ["/chat/popup", "/overlay"];
const noWrapperRoutes = ["/overlay/chat"];

function MyApp({ Component, pageProps }: any): JSX.Element {
  const router = useRouter();
  const showNavbar = !any(
    (path) => router.asPath.startsWith(path),
    noNavbarRoutes
  );
  const showWrapper = !any(
    (path) => router.asPath.startsWith(path),
    noWrapperRoutes
  );
  const Wrapper = showWrapper ? PageWrapper : (React.Fragment as any);
  const wrapperProps = showWrapper
    ? {
        paddingTop: showNavbar ? "50px" : undefined,
      }
    : {};
  const [isLiveUpdate, setLiveUpdate] = useState<boolean>(false);
  const [locale, setLocale] = useState<LocaleKey>("en");
  return (
    <>
      <Head>
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
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <LiveUpdateContext.Provider value={{ isLiveUpdate, setLiveUpdate }}>
          <SetIsLiveFromLocalStorage />
          <SetLocaleFromLocalStorage />
          <Chakra cookies={pageProps.cookies}>
            <ApolloProvider client={client}>
              <Flex h="100%" w="100%" direction="column">
                <Wrapper {...wrapperProps}>
                  {showNavbar && <Navbar />}
                  <DndProvider backend={HTML5Backend}>
                    <Component {...pageProps} />
                  </DndProvider>
                </Wrapper>
              </Flex>
            </ApolloProvider>
          </Chakra>
        </LiveUpdateContext.Provider>
      </LocaleContext.Provider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

const MyAppWithTranslation = appWithTranslation(MyApp);

export default MyAppWithTranslation;

// re-export the reusable `getServerSideProps` function
export { getServerSideProps } from "miracle-tv-client/Chakra";
