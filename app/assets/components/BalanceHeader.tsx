"use client";
import { useUser } from "@/hooks/useUser";
import { moneyParse } from "@/libs/numbering";
import { FC, useEffect, useState } from "react";

interface BalanceHeaderProps {
  initialBalance: number;
}

const BalanceHeader: FC<BalanceHeaderProps> = ({ initialBalance }) => {
  const [balance, setBalance] = useState<number>(initialBalance);
  const { supabase, isLoading, user } = useUser();

  useEffect(() => {
    const balances = supabase
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "balances" },
        (payload: any) => {
          console.log("Change received!", payload);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(balances);
    };
  }, []);

  return <p className="text-lg font-medium">{moneyParse(balance)}</p>;
};

export default BalanceHeader;
