import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

const DashboardRedirect = (): null => {
  const { push } = useRouter();

  useEffect(() => {
    push("/dashboard/streams/home");
  }, []);

  return null;
};

export default DashboardRedirect;
