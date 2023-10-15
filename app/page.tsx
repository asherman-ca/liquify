import getCoins from "@/actions/getCoins";

export default async function Home() {
  const coins = await getCoins();

  return (
    <main>
      <div>
        {coins.map((coin) => (
          <div className="mt-4 p-5" key={coin.id}>
            {coin.id}
          </div>
        ))}
      </div>
    </main>
  );
}
