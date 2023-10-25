import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ThemeSwitcher } from "./dark-mode/Switcher";
import Dropdown from "./ui/Dropdown";
import Link from "next/link";

const Nav = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  return (
    <div className="flex items-center justify-between p-8">
      <p className="text-3xl font-bold">Liquify</p>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        {sessionData.session?.user.user_metadata ? (
          <Dropdown user={sessionData.session?.user.user_metadata} />
        ) : (
          <Dropdown />
        )}
      </div>
    </div>
  );
};

export default Nav;
