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
    if (position.closed && position.pnl < 0) {
      return acc + position.pnl;
    } else {
      return acc;
    }
  }, 0);
};

const calcTotalOpenValue = (positions: Position[]) => {
  return positions.reduce((acc, position) => {
    if (!position.closed) {
      return acc + position.value;
    } else {
      return acc;
    }
  }, 0);
};

const calcTotalOpenPnl = (positions: Position[]) => {
  return positions.reduce((acc, position) => {
    if (!position.closed) {
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

  const totalGains = calcTotalGains(positions || initialPositions);
  const totalLoss = calcTotalLoss(positions || initialPositions);
  const totalOpenValue = calcTotalOpenValue(positions || initialPositions);
  const pnl =
    totalGains + totalLoss + calcTotalOpenPnl(positions || initialPositions);

  return (
    <div className="rounded-lg border-1 border-gray-300 bg-white text-gray-500">
      <div className="flex flex-col gap-1 border-b-1 border-gray-300 p-6">
        <p className="text-gray-500">My cash</p>
        <p className="text-lg font-medium text-black">
          {moneyParse(balance || initialBalance)}
        </p>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b-1 border-gray-300 text-right">
            <th className="w-[20%] py-6 pl-6 text-left">Name</th>
            <th className="w-[16%]">Total Cash</th>
            <th className="w-[16%]">Open Value</th>
            <th className="w-[16%]">PNL</th>
            <th className="w-[16%]">Total Losses</th>
            <th className="w-[16%] pr-6">Total Income</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-right">
            <td className="flex items-center gap-2 py-6 pl-6">
              <CircleDollarSign className="text-primary-500" /> US Dollar
            </td>
            <td>{moneyParse(balance || initialBalance)}</td>
            <td>{moneyParse(totalOpenValue)}</td>
            <td
              className={`${pnl < 0 && "text-red-500"} ${
                pnl > 0 && "text-green-500"
              }`}
            >
              {pnl < 0 ? `-${moneyParse(Math.abs(pnl))}` : moneyParse(pnl)}
            </td>
            <td className="text-red-500">{moneyParse(Math.abs(totalLoss))}</td>
            <td className="pr-6 text-green-500">{moneyParse(totalGains)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BalanceHeader;
