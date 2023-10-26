"use client";
import { FC, useState } from "react";
import FilterMenu from "./FilterMenu";
import CoinItem from "./CoinItem";

interface CoinTableProps {
  initialCoins: Coin[];
}

const CoinTable: FC<CoinTableProps> = ({ initialCoins }) => {
  const [coins, setCoins] = useState<Coin[]>(initialCoins);

  return (
    <div className="flex flex-col gap-4 px-10 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Prices</h2>
        <div className="flex items-center gap-6">
          <FilterMenu />
          <button>See all</button>
        </div>
      </div>
      <table className="w-full">
        <tbody>
          {coins.slice(0, 10).map((coin) => (
            <CoinItem key={coin.id} coin={coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
