"use client";
import { FC } from "react";

interface BalanceRowProps {
  initialBalance: number;
}

const BalanceRow: FC<BalanceRowProps> = ({ initialBalance }) => {
  return (
    <div className="border-b-1 border-gray-300 px-10 py-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg text-slate-500">My Balance</h2>
        <span className="text-xl font-medium">${initialBalance}</span>
      </div>
    </div>
  );
};

export default BalanceRow;
