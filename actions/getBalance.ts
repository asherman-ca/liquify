import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const getBalance = async (): Promise<number> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionData.session === null) return 99;

  const { data } = await supabase
    .from("balances")
    .select("balance")
    .eq("user_id", sessionData.session.user.id);

  return data![0].balance;
};

export default getBalance;
