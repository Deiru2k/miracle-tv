import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const AuthRedirect = ({ children }: Props) => {
  const { push } = useRouter();
  const { user, isUserLoading } = useCurrentUser();

  useEffect(() => {
    if (!isUserLoading && !user) {
      push("/auth/login");
    }
  }, [isUserLoading, user, push]);

  return !isUserLoading && !!user && <>{children}</>;
};
