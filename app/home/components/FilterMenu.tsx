"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FC } from "react";

interface FilterMenuProps {}

const FilterMenu: FC<FilterMenuProps> = ({}) => {
  return (
    <Dropdown
      classNames={{
        base: "min-w-0",
      }}
    >
      <DropdownTrigger>
        <Button
          variant={"bordered"}
          className="rounded-full text-base font-semibold"
        >
          Watchlist
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>Watchlist</DropdownItem>
        <DropdownItem>Trending</DropdownItem>
        <DropdownItem>Top assets</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default FilterMenu;
