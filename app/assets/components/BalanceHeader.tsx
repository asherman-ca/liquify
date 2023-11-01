"use client";
import { useUser } from "@/hooks/useUser";
import { moneyParse } from "@/libs/numbering";
import { CircleDollarSign } from "lucide-react";
import { FC } from "react";

interface BalanceHeaderProps {
  initialBalance: number;
}

const BalanceHeader: FC<BalanceHeaderProps> = ({ initialBalance }) => {
  const { balance } = useUser();

  return (
    <div className="rounded-lg border-1 border-gray-300 bg-white">
      <div className="flex flex-col gap-1 border-b-1 border-gray-300 p-4">
        <p className="text-gray-500">My cash</p>
        <p className="text-lg font-medium">
          {moneyParse(balance || initialBalance)}
        </p>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b-1 border-gray-300">
            <th className="p-4 text-left">Name</th>
            <th className="text-left">Total balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="flex items-center gap-2 p-4">
              <CircleDollarSign className="text-primary-500" /> US Dollar
            </td>
            <td>{moneyParse(balance || initialBalance)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BalanceHeader;
