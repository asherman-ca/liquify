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
    <div className="border-b-1 flex items-center justify-between border-gray-300 p-4">
      <h2 className="text-lg font-medium">Home</h2>
      <Dropdown user={sessionData.session} />
    </div>
  );
};

export default Nav;
