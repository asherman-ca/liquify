import getCoins from "@/actions/getCoins";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/libs/supabaseAdmin";

export async function GET() {
  try {
    console.log("cron job started");
    const coins = await getCoins();

    // const { data: balances, error: balancesError } = await supabaseAdmin
    //   .from("balances")
    //   .select("*");
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
        // console.log("short");
        if (percentageChange > 0) {
          const convertedPercentageChange = Math.abs(percentageChange) * 0.01;
          if (convertedPercentageChange * position.size > position.value) {
            // close position
          } else {
            // update current value
          }
        } else {
          // update current value
        }
      }
      // console.log("coin", coin.name);
      // console.log("positionPrice", positionPrice);
      // console.log("change", percentageChange);
    });

    // console.log("positions", positions);

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
