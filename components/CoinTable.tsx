"use client";
import { FC, useEffect, useState } from "react";
import FilterMenu from "./FilterMenu";
import CoinItem from "./CoinItem";
import getCoins from "@/actions/getCoins";

export type FilterType = "top" | "trending" | "watchlist";

interface CoinTableProps {
  initialCoins: Coin[];
  user: any;
  likes: any[];
}

const CoinTable: FC<CoinTableProps> = ({ initialCoins, user, likes }) => {
  const [coins, setCoins] = useState<Coin[]>(initialCoins);
  const [filter, setFilter] = useState<FilterType>("top");
  const [length, setLength] = useState<number>(10);
  const [curLikes, setCurLikes] = useState<string[]>(likes || []);

  const sortedCoins =
    filter === "watchlist"
      ? coins.filter((coin) => curLikes.includes(coin.id))
      : coins
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
      getCoins().then((coins) => setCoins(coins));
    }, 60000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 px-6 py-6 text-gray-500 md:px-10">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Prices</h2>
        <div className="flex items-center gap-6">
          <FilterMenu setFilter={setFilter} filter={filter} user={user} />
          <button onClick={() => setLength((prev) => (prev === 10 ? 50 : 10))}>
            See all
          </button>
        </div>
      </div>
      <table className="w-full">
        <tbody>
          {sortedCoins.map((coin) => (
            <CoinItem
              key={coin.id}
              coin={coin}
              isAuthed={!!user}
              initialLikedState={curLikes.includes(coin.id)}
              setCurLikes={setCurLikes}
            />
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
