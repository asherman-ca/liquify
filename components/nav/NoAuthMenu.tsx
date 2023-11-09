import { Link, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { FC } from "react";

interface NoAuthMenuProps {}

const NoAuthMenu: FC<NoAuthMenuProps> = ({}) => {
  return (
    <NavbarMenu>
      <NavbarMenuItem>
        <Link size="lg" href="/">
          Home
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem>
        <Link size="lg" href="/assets">
          Assets
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem>
        <Link size="lg" href="/login">
          Login
        </Link>
      </NavbarMenuItem>

      {/* {menuItems.map((item, index) => (
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
      ))} */}
    </NavbarMenu>
  );
};

export default NoAuthMenu;
