"use client";
import { useUser } from "@/hooks/useUser";
import { FC, useEffect, useState } from "react";
import PositionItem from "./PositionItem";

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
        .channel("custom-insert-channel")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "positions",
            filter: `user_id=eq.${user?.id}`,
          },
          (payload: any) => {
            console.log(payload);
            setPositions((positions) => [payload.new, ...positions]);
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
    <table className="w-full">
      <thead>
        <tr className="text-left">
          <th className="p-4">Name</th>
          <th>Size</th>
          <th>Leverage</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((position: Position) => (
          <PositionItem position={position} key={position.id} />
        ))}
      </tbody>
    </table>
  );
};

export default PositionTable;
