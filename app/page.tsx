import React from "react";
import getCoins from "@/actions/getCoins";
import BalanceRow from "@/components/BalanceRow";
import getBalance from "@/actions/getBalance";
import CoinTable from "@/components/CoinTable";
import getUser from "@/actions/getUser";

export default async function Home() {
  const coins = await getCoins();
  const user = await getUser();
  let balanceElement;

  if (user) {
    const balance = await getBalance();
    balanceElement = <BalanceRow initialBalance={balance} />;
  }

  return (
    <div className="flex min-w-[850px] flex-1 flex-col overflow-x-auto scrollbar-hide">
      {user && balanceElement}
      <CoinTable initialCoins={coins} />
    </div>
  );
}
