import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Nav from "./Nav";
import { cookies } from "next/headers";
import getBalance from "@/actions/getBalance";
import getCoins from "@/actions/getCoins";

export const dynamic = "force-dynamic";

const NavContainer = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  let balance: number;

  if (sessionData.session) {
    balance = await getBalance();
  }

  const coins = await getCoins();

  return <Nav coins={coins} balance={balance!} session={sessionData} />;
};

export default NavContainer;
