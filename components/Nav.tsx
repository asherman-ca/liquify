import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Dropdown from "./ui/Dropdown";

const Nav = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  return (
    <div className="flex items-center justify-between p-8">
      <p className="text-3xl font-bold">L</p>
      <Dropdown user={sessionData.session} />
    </div>
  );
};

export default Nav;
