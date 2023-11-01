import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Dropdown from "./ui/Dropdown";
import NavTitle from "./ui/NavTitle";
import BuySellButton from "./ui/BuySellButton";
import NavSearchDropdown from "./NavSearchDropdown";
import getCoins from "@/actions/getCoins";
import BuySellModal from "./buy-sell-form/BuySellModal";
import getBalance from "@/actions/getBalance";

export const dynamic = "force-dynamic";

const Nav = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  let balance: number;

  if (sessionData.session) {
    balance = await getBalance();
  }

  const coins = await getCoins();

  return (
    <div className="flex items-center justify-between border-b-1 border-gray-300 px-10 py-6">
      <NavTitle />
      <div className="flex items-center gap-8">
        <NavSearchDropdown coins={coins} />
        {sessionData.session && (
          <BuySellModal coins={coins} balance={balance!} />
        )}
        <Dropdown user={sessionData.session} />
      </div>
    </div>
  );
};

export default Nav;
