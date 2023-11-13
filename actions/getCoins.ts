export const dynamic = "force-dynamic";

export default async function (): Promise<Coin[]> {
  let res;
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const coins = await fetch(
      "https://api.coincap.io/v2/assets?limit=100",
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
