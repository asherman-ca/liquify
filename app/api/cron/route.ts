import getCoins from "@/actions/getCoins";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/libs/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    console.log("cron job started");
    const coins = await getCoins();
    const { data: positions, error: positionsError } = await supabaseAdmin
      .from("positions")
      .select("*")
      .filter("closed", "eq", false);

    if (positionsError) throw new Error("something went wrong");

    positions.forEach(async (position) => {
      const currentPrice = Number(
        coins.find((coin) => coin.id === position.coin_id)?.priceUsd,
      );
      const positionPrice = position.coin_price;
      const percentageChange =
        ((currentPrice - positionPrice) / positionPrice) * 100;
      const convertedPercentageChange = Math.abs(percentageChange) * 0.01;
      const initialSize = position.value * position.leverage;

      if (position.direction === "long") {
        if (percentageChange < 0) {
          if (convertedPercentageChange * position.size > position.value) {
            const { data, error } = await supabaseAdmin
              .from("positions")
              .update({
                size: initialSize - position.value,
                closed: true,
                pnl: -position.value,
                liquidated: true,
              })
              .eq("id", position.id);
          } else {
            const { data, error } = await supabaseAdmin
              .from("positions")
              .update({
                size: initialSize - convertedPercentageChange * initialSize,
                pnl: -convertedPercentageChange * initialSize,
              })
              .eq("id", position.id);
          }
        } else {
          console.log("convertedPercentageChange", convertedPercentageChange);
          const { data, error } = await supabaseAdmin
            .from("positions")
            .update({
              size: initialSize + convertedPercentageChange * initialSize,
              pnl: convertedPercentageChange * initialSize,
            })
            .eq("id", position.id);
        }
      } else {
        if (percentageChange > 0) {
          if (convertedPercentageChange * position.size > position.value) {
            const { data, error } = await supabaseAdmin
              .from("positions")
              .update({
                size: initialSize - position.value,
                closed: true,
                pnl: -position.value,
                liquidated: true,
              })
              .eq("id", position.id);
          } else {
            const { data, error } = await supabaseAdmin
              .from("positions")
              .update({
                size: initialSize - convertedPercentageChange * initialSize,
                pnl: -convertedPercentageChange * initialSize,
              })
              .eq("id", position.id);
          }
        } else {
          const { data, error } = await supabaseAdmin
            .from("positions")
            .update({
              size: initialSize + convertedPercentageChange * initialSize,
              pnl: convertedPercentageChange * initialSize,
            })
            .eq("id", position.id);
        }
      }
    });

    return NextResponse.json({
      status: 200,
      body: {
        data: "ok",
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      body: {
        error: "something went wrong",
      },
    });
  }
}
