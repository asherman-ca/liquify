import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ThemeSwitcher } from "./Switcher";
import Avatar from "./ui/Avatar";
import Dropdown from "./ui/Dropdown";

const Nav = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  return (
    <div className="flex items-center justify-between">
      <div>Nav</div>
      <Dropdown user={sessionData.session?.user.user_metadata} />
    </div>
  );
};

export default Nav;
