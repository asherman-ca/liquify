"use client";
import { useUser } from "@/hooks/useUser";
import { moneyParse } from "@/libs/numbering";
import { CircleDollarSign } from "lucide-react";
import { FC } from "react";

const calcTotalGains = (positions: Position[]) => {
  return positions.reduce((acc, position) => {
    if (position.closed && position.pnl > 0) {
      return acc + position.pnl;
    } else {
      return acc;
    }
  }, 0);
};

const calcTotalLoss = (positions: Position[]) => {
  return positions.reduce((acc, position) => {
    if (position.closed) {
      return acc + position.pnl;
    } else {
      return acc;
    }
  }, 0);
};

interface BalanceHeaderProps {
  initialBalance: number;
  initialPositions: Position[];
}

const BalanceHeader: FC<BalanceHeaderProps> = ({
  initialBalance,
  initialPositions,
}) => {
  const { balance, positions } = useUser();

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
            <th className="text-left">Total Losses</th>
            <th className="text-left">Total Gains</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="flex items-center gap-2 p-4">
              <CircleDollarSign className="text-primary-500" /> US Dollar
            </td>
            <td>{moneyParse(balance || initialBalance)}</td>
            <td>
              {moneyParse(
                Math.abs(calcTotalLoss(positions || initialPositions)),
              )}
            </td>
            <td>
              {moneyParse(
                Math.abs(calcTotalGains(positions || initialPositions)),
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BalanceHeader;
