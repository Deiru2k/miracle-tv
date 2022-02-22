import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home = (): null => {
  const { replace } = useRouter();
  const { currentUser, isUserLoading, isUserCalled } = useCurrentUser();

  useEffect(() => {
    if (!isUserLoading && isUserCalled) {
      if (currentUser) {
        replace("/dashboard", null, { shallow: true });
      } else {
        replace("/about", null, { shallow: true });
      }
    }
  }, [replace, isUserLoading, isUserCalled]);

  return null;
};

export default Home;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navbar"])),
    },
  };
}
