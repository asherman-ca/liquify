"use client";
import { useUser } from "@/hooks/useUser";
import { moneyParse } from "@/libs/numbering";
import { FC } from "react";

interface BalanceHeaderProps {
  initialBalance: number;
}

const BalanceHeader: FC<BalanceHeaderProps> = ({ initialBalance }) => {
  const { balance } = useUser();

  return (
    <p className="text-lg font-medium">
      {moneyParse(balance || initialBalance)}
    </p>
  );
};

export default BalanceHeader;
