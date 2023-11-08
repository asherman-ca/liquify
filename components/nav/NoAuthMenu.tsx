import { Link, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { FC } from "react";

const menuItems = ["Home", "Assets", "Log In"];

interface NoAuthMenuProps {}

const NoAuthMenu: FC<NoAuthMenuProps> = ({}) => {
  return (
    <NavbarMenu>
      {menuItems.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`} className="px-4">
          <Link
            color={
              index === 2
                ? "primary"
                : index === menuItems.length - 1
                ? "danger"
                : "foreground"
            }
            className="w-full"
            href="#"
            size="lg"
          >
            {item}
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  );
};

export default NoAuthMenu;
