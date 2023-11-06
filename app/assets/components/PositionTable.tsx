"use client";
import { useUser } from "@/hooks/useUser";
import { FC } from "react";
import PositionItem from "./PositionItem";
import { moneyParse } from "@/libs/numbering";
import { toast } from "sonner";
import useConfetti from "@/hooks/useConfetti";

const calcTotalSize = (positions: Position[]) => {
  return positions.reduce((acc, position) => {
    if (position.closed) {
      return acc;
    } else {
      return acc + position.size;
    }
  }, 0);
};

interface PositionTableProps {
  initialPositions: Position[];
}

const PositionTable: FC<PositionTableProps> = ({ initialPositions }) => {
  const { active, toggle } = useConfetti();
  const { positions, supabase, balance, user } = useUser();
  const displayPositions = positions || initialPositions;

  const handleSell = async (position: Position) => {
    if (position.closed) return;
    const { error } = await supabase
      .from("positions")
      .update({
        closed: true,
      })
      .eq("id", position.id);
    if (error) {
      toast.error("Something went wrong");
      return console.log(error);
    }
    const { error: error2 } = await supabase
      .from("balances")
      .update({ balance: balance! + position.pnl + position.value })
      .eq("user_id", user!.id);
    if (error2) {
      toast.error("Something went wrong");
    } else {
      toast.success("Position closed 💰");
      if (position.pnl > 0) {
        toggle();
      }
    }
  };

  return (
    <div className="rounded-lg border-1 border-gray-300 bg-white">
      <div className="flex border-b-1 border-gray-300 p-4">
        <div className="flex w-[15%] flex-col gap-1">
          <p className="text-gray-500">Open Interest</p>
          <p className="text-lg font-medium">
            {moneyParse(calcTotalSize(positions || initialPositions))}
          </p>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th className="w-[20%] p-4">Name</th>
            <th className="w-[16%]">Size</th>
            <th className="w-[16%]">PNL</th>
            <th className="w-[16%]">Leverage</th>
            <th className="w-[16%]">Entry</th>
            <th className="w-[16%]">Status</th>
          </tr>
        </thead>
        <tbody>
          {displayPositions.map((position: Position) => (
            <PositionItem
              position={position}
              key={position.id}
              handleSell={handleSell}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionTable;
