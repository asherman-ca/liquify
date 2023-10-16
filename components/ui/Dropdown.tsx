"use client";
import React from "react";
import {
  Dropdown as NextDropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Avatar,
} from "@nextui-org/react";
// import Avatar from "./Avatar";

interface DropdownProps {
  user: {
    avatar_url: string;
    name: string;
  };
}

const Dropdown = ({ user }: DropdownProps) => {
  const { avatar_url, name } = user;

  return (
    <div className="flex items-center gap-4">
      <NextDropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            as="button"
            isBordered
            showFallback
            name={name[0] ?? ""}
            src={avatar_url ?? ""}
          />
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
