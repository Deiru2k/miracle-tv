import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";

type Props = {
  target: string;
};

export const Redirect: React.FC<Props> = ({ target }: Props) => {
  const { push } = useRouter();

  useEffect(() => {
    push(target, null, { shallow: true });
  }, []);

  return null;
};
