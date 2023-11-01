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
      .select("*");

    if (positionsError) throw new Error("something went wrong");

    positions.forEach(async (position) => {
      const coin = coins.find((coin) => coin.id === position.coin_id);
      const currentPrice = Number(
        coins.find((coin) => coin.id === position.coin_id)?.priceUsd,
      );
      const positionPrice = position.coin_price;
      const percentageChange =
        ((currentPrice - positionPrice) / positionPrice) * 100;

      if (position.direction === "long") {
        if (percentageChange < 0) {
          const convertedPercentageChange = Math.abs(percentageChange) * 0.01;
          if (convertedPercentageChange * position.size > position.value) {
            // console.log(position.value);
          }
        }
        // console.log("long");
      } else {
        // console.log("short");
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
