import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

type Props = {
  roles?: string[];
};

export const AuthRedirect = (_props: Props): null => {
  const { push } = useRouter();
  const { user, isUserLoading } = useCurrentUser();

  useEffect(() => {
    if (!isUserLoading && !user) {
      push("/auth/login");
    }
  }, [isUserLoading, user, push]);

  return null;
};
