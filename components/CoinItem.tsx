// import { Coin } from "@/types_d";
import Image from "next/image";
import { FC } from "react";
import { Star } from "lucide-react";
import { parseNumber, moneyParse } from "@/libs/numbering";

interface CoinItemProps {
  coin: Coin;
}

const CoinItem: FC<CoinItemProps> = ({ coin }) => {
  return (
    <tr className="">
      <td className="flex w-[35%] items-center gap-4 py-4">
        <Image
          src={`/icon/${coin.symbol.toLowerCase()}.png`}
          className="h-9 w-9"
          alt="logo"
          height={32}
          width={32}
        />
        <div className="flex flex-col">
          <p className="font-medium">{coin.name}</p>
          <p className="text-slate-400">{coin.symbol}</p>
        </div>
      </td>

      <td className="w-[15%]">{moneyParse(Number(coin.priceUsd))}</td>

      <td
        className={`w-[15%] ${
          Number(coin.changePercent24Hr) > 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {parseNumber(coin.changePercent24Hr)}%
      </td>

      <td className="w-[15%]">{moneyParse(Number(coin.marketCapUsd))}</td>

      <td className="w-[10%] text-blue-500">
        <div className="flex w-full justify-end">
          <button>Buy</button>
        </div>
      </td>

      <td className="w-[10%]">
        <div className="flex w-full justify-end">
          <button>
            <Star />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CoinItem;