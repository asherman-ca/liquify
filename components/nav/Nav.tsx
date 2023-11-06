"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

import { FC, useState } from "react";
import NavTitle from "../ui/NavTitle";
import NavSearchDropdown from "../NavSearchDropdown";
import BuySellModal from "../buy-sell-form/BuySellModal";
import Dropdown from "../ui/Dropdown";

interface NavProps {
  coins: any;
  session: any;
  balance: number;
}

const Nav2: FC<NavProps> = ({ coins, session, balance }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      classNames={{
        base: "justify-between w-full p-2",
        wrapper: "w-full max-w-none",
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NavTitle />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-6">
        <NavbarItem>
          <NavSearchDropdown coins={coins} />
        </NavbarItem>
        {session.session && (
          <NavbarItem>
            <BuySellModal coins={coins} balance={balance!} />
          </NavbarItem>
        )}
        <NavbarItem>
          <Dropdown user={session.session} />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
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
    </Navbar>
  );
};

export default Nav2;
