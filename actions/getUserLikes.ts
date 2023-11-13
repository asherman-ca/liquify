import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const getUserLikes = async (): Promise<any> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionData.session === null) return;

  const { data } = await supabase
    .from("likes")
    .select("coin_id")
    .eq("user_id", sessionData.session.user.id);

  if (!data) return [];

  return data.map((like) => like.coin_id);
};

export default getUserLikes;
