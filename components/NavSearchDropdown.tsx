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

  const inputBg = open ? "" : "";

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
    setOpen(false);
    setSearch("");
    router.push(`/coin/${e.currentTarget.id}`);
  };

  return (
    <div ref={componentRef} className="relative z-50">
      <div
        onClick={() => {
          setOpen(false);
          setSearch("");
        }}
        className={`duration-2000 fixed left-0 top-0 z-10 h-screen w-full bg-gray-500 transition ease-in  ${
          open ? "flex opacity-50" : "hidden opacity-0"
        }`}
      ></div>
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
        className="relative z-10 min-w-[250px]"
      />
      {open && (
        <div
          id="coin dropdown"
          className="scrollbar-hide absolute top-[100%] z-10 mt-4 flex max-h-[490px] w-full flex-col overflow-auto rounded-lg bg-white p-2 shadow-xl dark:bg-[#18181B]"
        >
          {filteredCoins.map((coin) => (
            <button
              id={coin.id}
              className="hover:bg-primary-50 flex items-center justify-between rounded-md p-4 text-black dark:text-white dark:hover:text-white"
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
                <p className="text-medium truncate pr-4 font-medium">
                  {coin.name}
                </p>
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
