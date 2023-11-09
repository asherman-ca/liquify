"use client";
import { moneyParse } from "@/libs/numbering";
import { FC, useEffect, useState } from "react";

interface BalanceRowProps {
  initialBalance: number;
}

const BalanceRow: FC<BalanceRowProps> = ({ initialBalance }) => {
  const [balance, setBalance] = useState<number>(initialBalance);

  useEffect(() => {
    setBalance(initialBalance);
  }, [initialBalance]);

  console.log(initialBalance);

  return (
    <div className="border-b-1 border-gray-300 px-6 py-6 md:px-10">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg text-slate-500">My Balance</h2>
        <span className="text-xl font-medium">{moneyParse(balance)}</span>
      </div>
    </div>
  );
};

export default BalanceRow;
