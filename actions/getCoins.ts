import { Coin } from "@/types_d";

export default async function (): Promise<Coin[]> {
  let res;
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const coins = await fetch(
      "https://api.coincap.io/v2/assets",
      requestOptions,
    );
    if (!coins) throw new Error();
    res = await coins.json();
  } catch (error) {
    console.log("error", error);
    throw new Error();
  }

  return res.data;
}
