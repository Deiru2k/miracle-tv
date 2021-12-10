import { AspectRatio, Image, ImageProps } from "@chakra-ui/react";
import { getMediaURL } from "miracle-tv-shared/media";
import React from "react";

type Props = {
  emailHash?: string;
  useGravatar?: boolean;
  imageId?: string;
  username: string;
  aspectMaxW?: string;
  aspectMaxH?: string;
} & ImageProps;

export const Avatar = ({
  useGravatar = false,
  emailHash,
  imageId,
  username,
  aspectMaxH,
  aspectMaxW,
  ...props
}: Props) => {
  const gravatarSize = aspectMaxW ? `?s=${aspectMaxW}` : "";
  const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}${gravatarSize}`;
  const imageUrl = !useGravatar ? getMediaURL(imageId) : gravatarUrl;
  const alt = `${username}'s gravatar`;
  return (
    <AspectRatio
      w={aspectMaxW || "100%"}
      ratio={1}
      maxH={aspectMaxH}
      maxW={aspectMaxW}
    >
      <Image
        {...props}
        w={aspectMaxW || "100%"}
        h={aspectMaxH || "100%"}
        src={imageUrl}
        alt={alt}
      />
    </AspectRatio>
  );
};
