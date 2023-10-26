import React from "react";
import getCoins from "@/actions/getCoins";
import BalanceRow from "@/components/BalanceRow";
import getBalance from "@/actions/getBalance";
import CoinTable from "./components/CoinTable";

const page = async () => {
  const coins = await getCoins();
  const balance = await getBalance();

  return (
    <div className="flex flex-1 flex-col">
      <BalanceRow initialBalance={balance} />
      <CoinTable initialCoins={coins} />
    </div>
  );
};

export default page;
