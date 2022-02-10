import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

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
