"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FC } from "react";
import { FilterType } from "./CoinTable";

interface FilterMenuProps {
  setFilter: (filter: FilterType) => void;
  filter: string;
  user: any;
}

const FilterMenu: FC<FilterMenuProps> = ({ setFilter, filter, user }) => {
  return (
    <Dropdown
      classNames={{
        base: "min-w-0",
      }}
    >
      <DropdownTrigger>
        <Button
          variant={"bordered"}
          className="rounded-full text-base font-semibold capitalize"
        >
          {filter === "top" ? "Top assets" : filter}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem onClick={() => setFilter("trending")}>
          Trending
        </DropdownItem>
        <DropdownItem onClick={() => setFilter("top")}>Top assets</DropdownItem>
        {user && (
          <DropdownItem onClick={() => setFilter("watchlist")}>
            Watchlist
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default FilterMenu;
