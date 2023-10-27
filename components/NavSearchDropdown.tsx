"use client";
import { FC, useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/react";
import { Search } from "lucide-react";

interface NavSearchDropdownProps {
  coins: Coin[];
}

const NavSearchDropdown: FC<NavSearchDropdownProps> = ({ coins }) => {
  const [search, setSearch] = useState<string>("");
  const componentRef = useRef<HTMLDivElement | null>(null);

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        console.log("Clicked outside the component");
        setSearch("");
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={componentRef}>
      <Input
        placeholder="Search for an asset"
        radius="full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startContent={<Search className="h-5 w-5" strokeWidth={3} />}
      />
      <div id="coin dropdown" className="absolute top-[100%]">
        {search && filteredCoins.map((coin) => <div id={coin.id}>coin</div>)}
      </div>
    </div>
  );
};

export default NavSearchDropdown;
