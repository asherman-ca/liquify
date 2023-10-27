"use client";
import { FC, useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NavSearchDropdownProps {
  coins: Coin[];
}

const NavSearchDropdown: FC<NavSearchDropdownProps> = ({ coins }) => {
  const [search, setSearch] = useState<string>("");
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const filteredCoins =
    search === ""
      ? coins
      : coins.filter((coin) => {
          return coin.name.toLowerCase().includes(search.toLowerCase());
        });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        console.log("Clicked outside the component");
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push(`/coin/${e.currentTarget.id}`);
    setOpen(false);
  };

  return (
    <div ref={componentRef} className="relative">
      <Input
        onClick={() => setOpen(true)}
        placeholder="Search for an asset"
        radius="full"
        value={search}
        onChange={(e) => {
          setOpen(true);
          setSearch(e.target.value);
        }}
        startContent={<Search className="h-5 w-5" strokeWidth={3} />}
        className="min-w-[250px]"
      />
      {open && (
        <div
          id="coin dropdown"
          className="absolute top-[100%] z-10 mt-4 flex w-full flex-col rounded-lg bg-white p-2 shadow-xl"
        >
          {filteredCoins.map((coin) => (
            <button
              id={coin.id}
              className="flex items-center justify-between rounded-md p-4 hover:bg-gray-100"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleClick(e)
              }
            >
              <div className="flex items-center gap-2 ">
                <Image
                  src={`/icon/${coin.symbol}.png`}
                  alt="logo"
                  height={24}
                  width={24}
                  className="h-6 w-6"
                />
                <p className="text-medium font-semibold">{coin.name}</p>
              </div>
              <p>{coin.symbol}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavSearchDropdown;
