"use client";
import React from "react";
import {
  Dropdown as NextDropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  DropdownSection,
} from "@nextui-org/react";
import { UserMetadata } from "@supabase/gotrue-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "../dark-mode/Switcher";

interface DropdownProps {
  user: any;
}

const Dropdown = ({ user }: DropdownProps) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleLink = (url: string) => {
    router.push(url);
  };

  return (
    <div className="flex items-center gap-4">
      <NextDropdown placement="bottom-end" backdrop="blur">
        <DropdownTrigger>
          <Avatar
            as="button"
            isBordered
            showFallback
            src={user?.user.user_metadata.avatar_url || ""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          {user && (
            <DropdownSection showDivider>
              <DropdownItem>
                <p className="font-semibold">
                  Signed in as: <br /> {user?.user.email}
                </p>
              </DropdownItem>
            </DropdownSection>
          )}
          <DropdownItem href="/profile">Profile</DropdownItem>
          {/* <DropdownItem closeOnSelect={false} isReadOnly={true}>
            <ThemeSwitcher />
          </DropdownItem> */}
          <DropdownItem
            isReadOnly
            endContent={<ThemeSwitcher />}
            className="cursor-default"
          >
            Theme
          </DropdownItem>
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
