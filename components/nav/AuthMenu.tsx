import { useUser } from "@/hooks/useUser";
import { Link, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

const menuItems = ["Home", "Assets", "Log Out"];

interface AuthMenuProps {}

const AuthMenu: FC<AuthMenuProps> = ({}) => {
  const { supabase } = useUser();
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleLink = (url: string) => {
    router.push(url);
  };

  return (
    <NavbarMenu>
      {menuItems.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`} className="px-4">
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
      ))}
      <NavbarMenuItem onClick={handleSignOut}>Logout</NavbarMenuItem>
    </NavbarMenu>
  );
};

export default AuthMenu;
