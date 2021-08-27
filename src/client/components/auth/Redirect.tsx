import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const AuthRedirect = ({ children }: Props) => {
  const { push } = useRouter();
  const { currentUser, isUserLoading } = useCurrentUser();

  useEffect(() => {
    if (!isUserLoading && !currentUser) {
      push("/auth/login");
    }
  }, [isUserLoading, currentUser, push]);

  // return !isUserLoading && !!currentUser && <>{children}</>;
  return (
    <>
      {isUserLoading && (
        <Flex w="100%" h="100%" justify="center" align="center">
          <Spinner />
        </Flex>
      )}
      {!isUserLoading && currentUser && children}
    </>
  );
};
