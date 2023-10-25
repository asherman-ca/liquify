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

interface DropdownProps {
  user: UserMetadata;
}

const Dropdown = ({ user }: DropdownProps) => {
  const { avatar_url } = user;

  return (
    <div className="flex items-center gap-4">
      <NextDropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar as="button" isBordered showFallback src={avatar_url} />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem href="/profile">Profile</DropdownItem>
          <DropdownItem href="/settings">Settings</DropdownItem>
          <DropdownItem href="/logout">Logout</DropdownItem>
        </DropdownMenu>
      </NextDropdown>
    </div>
  );
};

export default Dropdown;
