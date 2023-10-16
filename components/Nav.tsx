import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Nav = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  console.log("deets", sessionData);

  return (
    <div>
      <div>Nav</div>
      <div>{sessionData.session ? "Logged In" : "Logged Out"}</div>
    </div>
  );
};

export default Nav;
