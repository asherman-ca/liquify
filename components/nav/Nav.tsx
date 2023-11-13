"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
} from "@nextui-org/react";

import { FC, useState } from "react";
import NavTitle from "./NavTitle";
import NavSearchDropdown from "./NavSearchDropdown";
import Dropdown from "./Dropdown";
import Image from "next/image";
import AuthMenu from "./AuthMenu";
import NoAuthMenu from "./NoAuthMenu";
import useTradeModal from "@/hooks/useTradeModal";

interface NavProps {
  coins: any;
  session: any;
  balance: number;
}

const Nav: FC<NavProps> = ({ coins, session, balance }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggle } = useTradeModal();

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      // isBordered
      classNames={{
        base: "justify-between w-full md:px-4 border-b-1 border-gray-300",
        wrapper: "w-full max-w-none",
      }}
    >
      <NavbarContent className="justify-between! flex">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand className="hidden md:flex">
          <NavTitle />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="logo"
            height={1024}
            width={1024}
            className="h-12 w-12 md:hidden"
          />
        </Link>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden gap-6 md:flex">
        <NavbarItem>
          <NavSearchDropdown coins={coins} />
        </NavbarItem>
        {session.session && (
          <NavbarItem>
            <Button
              onPress={() => toggle(true)}
              className="h-[40px] rounded-full px-8"
              color="primary"
            >
              Buy & Sell
            </Button>
          </NavbarItem>
        )}
        <NavbarItem>
          <Dropdown user={session.session} />
        </NavbarItem>
      </NavbarContent>

      {session.session ? (
        <AuthMenu user={session.session} setOpen={setIsMenuOpen} />
      ) : (
        <NoAuthMenu />
      )}
    </Navbar>
  );
};

export default Nav;
