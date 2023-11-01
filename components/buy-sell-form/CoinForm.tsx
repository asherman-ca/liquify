import { cn } from "@/libs/utils";
import { Input } from "@nextui-org/react";
import { ArrowLeft, Check, Search } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";

interface CoinFormProps {
  handleCoinSelection: (coin: Coin) => void;
  setOpen: (open: boolean) => void;
  coins: Coin[];
  coinId: string;
}

const CoinForm: FC<CoinFormProps> = ({
  handleCoinSelection,
  setOpen,
  coins,
  coinId,
}) => {
  const [filter, setFilter] = useState<string>("");
  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="flex h-[590px] flex-col gap-4 overflow-auto p-4 scrollbar-hide">
      <div id="title" className="relative">
        <ArrowLeft
          onClick={() => setOpen(false)}
          className="absolute left-0 top-[50%] -translate-y-[50%] cursor-pointer"
        />
        <h2 className="flex-1 text-center text-xl font-semibold">
          Select asset
        </h2>
      </div>
      <Input
        startContent={<Search className="h-5 w-5" strokeWidth={3} />}
        placeholder="Search"
        radius="sm"
        variant="bordered"
        classNames={{ inputWrapper: "border-1" }}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="flex flex-col gap-2">
        {filteredCoins.map((coin) => (
          <button
            key={coin.id}
            onClick={() => handleCoinSelection(coin)}
            className={cn(
              `flex w-full items-center justify-between gap-4 rounded-md px-4 py-2 hover:bg-primary-50 active:bg-primary-100`,
              {
                "bg-primary-50": coinId === coin.id,
              },
            )}
          >
            <div className="flex items-center gap-4">
              <Image
                src={`/icon/${coin.symbol.toLowerCase()}.png`}
                alt={coin.name}
                width={24}
                height={24}
                className="h-9 w-9"
              />
              <div className="flex flex-col items-start">
                <p>{coin.name}</p>
                <p className="text-gray-500">{coin.symbol.toLowerCase()}</p>
              </div>
            </div>
            {coinId === coin.id && <Check className="text-primary-500" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoinForm;
