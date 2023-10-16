"use client";
import { Avatar as NextAvatar } from "@nextui-org/react";

import { FC } from "react";

interface AvatarProps {
  url: string;
  name: string;
}

const Avatar: FC<AvatarProps> = ({ url, name }) => {
  return (
    <NextAvatar
      as="button"
      isBordered
      showFallback
      name={name ?? "A"}
      src={url ?? ""}
    />
  );
};

export default Avatar;
