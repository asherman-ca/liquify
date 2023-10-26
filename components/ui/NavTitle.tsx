"use client";

import { usePathname } from "next/navigation";
import { FC } from "react";

interface NavTitleProps {}

const NavTitle: FC<NavTitleProps> = ({}) => {
  const pathname = usePathname();

  return (
    <h2 className="text-lg font-medium capitalize">
      {pathname === "/" ? "home" : pathname.replace("/", "")}
    </h2>
  );
};

export default NavTitle;
