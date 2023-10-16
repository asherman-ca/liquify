import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ThemeSwitcher } from "./Switcher";

const Nav = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  console.log("deets", sessionData);

  return (
    <div className="flex items-center justify-between">
      <div>Nav</div>
      <ThemeSwitcher />
      <div>{sessionData.session ? "Logged In" : "Logged Out"}</div>
    </div>
  );
};

export default Nav;
