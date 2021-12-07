import { AspectRatio, Image } from "@chakra-ui/react";
import React from "react";

type Props = {
  emailHash?: string;
  username: string;
  aspectMaxW?: string;
  aspectMaxH?: string;
};

export const Gravatar = ({
  emailHash,
  username,
  aspectMaxH,
  aspectMaxW,
}: Props) => {
  const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?s=${aspectMaxW}`;
  const alt = `${username}'s gravatar`;
  return (
    <AspectRatio
      w={aspectMaxW || "100%"}
      ratio={1}
      maxH={aspectMaxH}
      maxW={aspectMaxW}
    >
      <Image
        w={aspectMaxW || "100%"}
        h={aspectMaxH || "100%"}
        src={gravatarUrl}
        alt={alt}
      />
    </AspectRatio>
  );
};
