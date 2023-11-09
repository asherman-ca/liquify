"use client";
import Image from "next/image";
import Link from "next/link";
import { Coins, Home, PiggyBank } from "lucide-react";
import { ReactComponentElement, use } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/libs/utils";
import useTradeModal from "@/hooks/useTradeModal";
import { useUser } from "@/hooks/useUser";

interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

type LinkType = {
  title: string;
  url: string;
  logo?: ReactComponentElement<any>;
};

const links: LinkType[] = [
  {
    title: "Home",
    url: "/",
    logo: <Home />,
  },
  {
    title: "My Assets",
    url: "/assets",
    logo: <PiggyBank />,
  },
  // {
  //   title: "Trade",
  //   url: "/trade",
  //   logo: <Coins />,
  // },
];

const Sidebar = ({ children, ...props }: SideBarProps) => {
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const { toggle } = useTradeModal();

  return (
    <div className="flex h-full min-h-screen flex-1">
      <div
        id="sidebar"
        {...props}
        className="hidden flex-col gap-4 border-r-1 border-gray-300 p-4 md:flex"
      >
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="logo"
            height={1024}
            width={1024}
            className="h-12 w-12"
          />
        </Link>
        <div id="links" className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              href={link.url}
              key={link.title}
              className={cn(
                "flex items-center gap-4 rounded-full p-4 font-medium hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white",
                {
                  "bg-primary-50 text-blue-700  dark:text-blue-500 dark:hover:text-white":
                    pathname === link.url,
                },
              )}
            >
              {link.logo}
              {link.title}
            </Link>
          ))}
          {/* <button
            onClick={() => {
              fetch("/api/cron", {
                method: "GET",
              });
            }}
          >
            liquify
          </button> */}
          <button
            onClick={() => {
              if (user) {
                toggle(true);
              } else {
                router.push("/login");
              }
            }}
            className={cn(
              "flex-start flex w-full items-center gap-4 rounded-full p-4 font-medium hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white",
            )}
          >
            <Coins />
            Trade
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;

// interface Beans {[key: string]: string}[]
