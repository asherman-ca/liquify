import getCoins from "@/actions/getCoins";
import ClientTest from "@/components/ClientTest";

export default async function Home() {
  const coins = await getCoins();

  return (
    <main>
      <ClientTest />
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
