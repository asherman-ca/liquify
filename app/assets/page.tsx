import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import React from "react";
import getPositions from "@/actions/getPositions";
import getBalance from "@/actions/getBalance";
import { moneyParse } from "@/libs/numbering";
import { CircleDollarSign } from "lucide-react";
import PositionTable from "./components/PositionTable";

export const dynamic = "force-dynamic";

const page = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const positions = await getPositions();
  const balance = await getBalance();

  return (
    <div className="flex flex-1 flex-col gap-4 bg-gray-50 p-6">
      <div className="rounded-lg border-1 border-gray-300 bg-white">
        <div className="border-b-1 border-gray-300 p-4">
          <p className="text-gray-500">My cash</p>
          <p className="text-lg font-medium">{moneyParse(balance)}</p>
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
              <td>{moneyParse(balance)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="rounded-lg border-1 border-gray-300 bg-white">
        <div className="border-b-1 border-gray-300 p-4">
          <p className="text-gray-500">My positions</p>
          <p className="text-lg font-medium">$15,000</p>
        </div>
        <PositionTable initialPositions={positions} />
      </div>
    </div>
  );
};

export default page;
