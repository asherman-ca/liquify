import useTradeModal from "@/hooks/useTradeModal";
import { useUser } from "@/hooks/useUser";
import { Link, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface AuthMenuProps {
  user: any;
  setOpen: (arg: boolean) => void;
}

const AuthMenu: FC<AuthMenuProps> = ({ user, setOpen }) => {
  const { supabase } = useUser();
  const router = useRouter();
  const { toggle } = useTradeModal();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleLink = (url: string) => {
    router.push(url);
  };

  return (
    <NavbarMenu>
      <p className="font-semibold">
        Signed in as: <br /> {user?.user.email}
      </p>
      <NavbarMenuItem>
        <Link size="lg" href="/">
          Home
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem>
        <Link size="lg" href="/assets">
          Assets
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem
        className="cursor-pointer text-primary-500"
        onClick={() => {
          setOpen(false);
          toggle(true);
        }}
      >
        Trade
      </NavbarMenuItem>
      {/* {menuItems.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`} className="">
          <Link
            color={
              index === 2
                ? "primary"
                : index === menuItems.length - 1
                ? "danger"
                : "foreground"
            }
            className="w-full"
            href="#"
            size="lg"
          >
            {item}
          </Link>
        </NavbarMenuItem>
      ))} */}
      <NavbarMenuItem
        onClick={handleSignOut}
        className="cursor-pointer text-primary-500"
      >
        Logout
      </NavbarMenuItem>
    </NavbarMenu>
  );
};

export default AuthMenu;
