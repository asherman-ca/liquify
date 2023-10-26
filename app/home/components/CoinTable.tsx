"use client";
import { FC, useEffect, useState } from "react";
import FilterMenu from "./FilterMenu";
import CoinItem from "./CoinItem";
import getCoins from "@/actions/getCoins";

export type FilterType = "top" | "trending" | "watchlist";

interface CoinTableProps {
  initialCoins: Coin[];
}

const CoinTable: FC<CoinTableProps> = ({ initialCoins }) => {
  const [coins, setCoins] = useState<Coin[]>(initialCoins);
  const [filter, setFilter] = useState<FilterType>("top");
  const [length, setLength] = useState<number>(5);

  const sortedCoins = coins
    .sort((a, b) => {
      if (filter === "top") {
        return Number(b.marketCapUsd) - Number(a.marketCapUsd);
      } else if (filter === "trending") {
        return Number(b.changePercent24Hr) - Number(a.changePercent24Hr);
      }
      return Number(b.marketCapUsd) - Number(a.marketCapUsd);
    })
    .slice(0, length);

  useEffect(() => {
    let id = setInterval(() => {
      console.log("fetches coins");
      getCoins().then(() => setCoins(coins));
    }, 60000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 px-10 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Prices</h2>
        <div className="flex items-center gap-6">
          <FilterMenu setFilter={setFilter} filter={filter} />
          <button onClick={() => setLength((prev) => (prev === 5 ? 10 : 5))}>
            See all
          </button>
        </div>
      </div>
      <table className="w-full">
        <tbody>
          {sortedCoins.map((coin) => (
            <CoinItem key={coin.id} coin={coin} />
          ))}
        </tbody>
      </table>
      <p className="mt-auto text-sm">
        Information is provided for informational purposes only and is not
        investment advice. <span className="text-blue-500">Learn more</span>
      </p>
    </div>
  );
};

export default CoinTable;
