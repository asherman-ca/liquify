"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const BuySellButton = () => {
  return (
    <Button className="h-[40px] rounded-full px-8" color="primary">
      <Link href="/trade">Buy & Sell</Link>
    </Button>
  );
};

export default BuySellButton;
