import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Dropdown from "./ui/Dropdown";
import NavTitle from "./ui/NavTitle";
import BuySellButton from "./ui/BuySellButton";

const Nav = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  return (
    <div className="border-b-1 flex items-center justify-between border-gray-300 px-10 py-6">
      <NavTitle />
      <div className="flex items-center gap-8">
        {sessionData.session && <BuySellButton />}
        <Dropdown user={sessionData.session} />
      </div>
    </div>
  );
};

export default Nav;
