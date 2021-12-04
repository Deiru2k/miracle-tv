import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

const Home = (): null => {
  const { push } = useRouter();
  const { currentUser, isUserLoading, isUserCalled } = useCurrentUser();

  useEffect(() => {
    if (!isUserLoading && isUserCalled) {
      if (currentUser) {
        push("/dashboard", null, { shallow: true });
      } else {
        push("/about", null, { shallow: true });
      }
    }
  }, [push, isUserLoading, isUserCalled]);

  return null;
};

export default Home;
