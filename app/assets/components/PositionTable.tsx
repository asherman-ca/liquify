"use client";
import { useUser } from "@/hooks/useUser";
import { FC, useEffect, useState } from "react";
import PositionItem from "./PositionItem";
import { moneyParse } from "@/libs/numbering";

const calcTotalSize = (positions: Position[]) => {
  return positions.reduce((acc, position) => {
    if (position.closed) {
      return acc;
    } else {
      return acc + position.size;
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

interface PositionTableProps {
  initialPositions: Position[];
}

const PositionTable: FC<PositionTableProps> = ({ initialPositions }) => {
  const [positions, setPositions] = useState<Position[]>(initialPositions);
  const { supabase, user } = useUser();

  useEffect(() => {
    let unsub: any = null;
    if (user) {
      unsub = supabase
        .channel("custom-all-channel")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "positions",
            filter: `user_id=eq.${user?.id}`,
          },
          (payload: any) => {
            if (payload.eventType === "UPDATE") {
              console.log(payload);
              setPositions((positions) =>
                positions.map((position) => {
                  if (position.id === payload.new.id) {
                    return payload.new;
                  } else {
                    return position;
                  }
                }),
              );
            } else {
              setPositions((positions) => [payload.new, ...positions]);
            }
          },
        )
        .subscribe();
    }

    return () => {
      if (unsub) {
        supabase.removeChannel(unsub);
      }
    };
  }, [user]);

  return (
    <div className="rounded-lg border-1 border-gray-300 bg-white">
      <div className="flex border-b-1 border-gray-300 p-4">
        <div className="flex w-[15%] flex-col gap-1">
          <p className="text-gray-500">Open Interest</p>
          <p className="text-lg font-medium">
            {moneyParse(calcTotalSize(positions))}
          </p>
        </div>
        <div className="flex w-[15%] flex-col gap-1">
          <p className="text-gray-500">Total Loss</p>
          <p className="text-lg font-medium text-red-500">
            {moneyParse(Math.abs(calcTotalLoss(positions)))}
          </p>
        </div>
        <div className="h-full! flex w-[15%] flex-col justify-between">
          <p className="text-gray-500">Total Gains</p>
          <div className="text-xl">🎰💩🎰💩</div>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th className="p-4">Name</th>
            <th>Size</th>
            <th>PNL</th>
            <th>Leverage</th>
            <th>Entry</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position: Position) => (
            <PositionItem position={position} key={position.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionTable;
