"use client";
import React from "react";
import {
  Dropdown as NextDropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { UserMetadata } from "@supabase/gotrue-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DropdownProps {
  user?: UserMetadata;
}

const Dropdown = ({ user }: DropdownProps) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  // const { avatar_url } = user;
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleLink = (url: string) => {
    router.push(url);
  };

  return (
    <div className="flex items-center gap-4">
      <NextDropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            as="button"
            isBordered
            showFallback
            src={user?.avatar_url || ""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem href="/profile">Profile</DropdownItem>
          <DropdownItem href="/settings">Settings</DropdownItem>
          {user ? (
            <DropdownItem onClick={handleSignOut}>Logout</DropdownItem>
          ) : (
            <DropdownItem onClick={() => handleLink("/login")}>
              Login
            </DropdownItem>
          )}
        </DropdownMenu>
      </NextDropdown>
    </div>
  );
};

export default Dropdown;
