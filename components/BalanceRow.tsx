"use client";
import { moneyParse } from "@/libs/numbering";
import { FC, useEffect, useState } from "react";

interface BalanceRowProps {
  initialBalance: number;
}

const BalanceRow: FC<BalanceRowProps> = ({ initialBalance }) => {
  const [balance, setBalance] = useState<number>(initialBalance);

  useEffect(() => {
    // let id = setInterval(() => {
    //   setBalance((prev) => prev + 1000);
    // }, 20000);
    // return () => {
    //   clearInterval(id);
    // };
  }, []);

  return (
    <div className="border-b-1 border-gray-300 px-10 py-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg text-slate-500">My Balance</h2>
        <span className="text-xl font-medium">{moneyParse(balance)}</span>
      </div>
    </div>
  );
};

export default BalanceRow;
