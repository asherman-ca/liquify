import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getBalance = async (): Promise<number> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  console.log(sessionData.session);

  if (sessionData.session === null) return 99;

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", sessionData.session.user.id);

  if (!data) return 9000.39;

  return data;
};

export default getBalance;
