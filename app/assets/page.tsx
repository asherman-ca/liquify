import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import React from "react";
import getPositions from "@/actions/getPositions";
import getBalance from "@/actions/getBalance";
import PositionTable from "./components/PositionTable";
import BalanceHeader from "./components/BalanceHeader";

export const dynamic = "force-dynamic";

const page = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const positions = await getPositions();
  const balance = await getBalance();

  return (
    <div className="flex flex-1 flex-col gap-6 bg-gray-50 p-6">
      <BalanceHeader initialBalance={balance} initialPositions={positions} />
      <PositionTable initialPositions={positions} />
    </div>
  );
};

export default page;
