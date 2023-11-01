"use client";
import Image from "next/image";
import Link from "next/link";
import { Coins, Home, PiggyBank } from "lucide-react";
import { ReactComponentElement } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/utils";

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
    url: "/home",
    logo: <Home />,
  },
  {
    title: "My Assets",
    url: "/assets",
    logo: <PiggyBank />,
  },
  {
    title: "Trade",
    url: "/trade",
    logo: <Coins />,
  },
];

const Sidebar = ({ children, ...props }: SideBarProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-1">
      <div
        id="sidebar"
        {...props}
        className="flex flex-col gap-4 border-r-1 border-gray-300 p-4"
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
                  "text-blue-700 dark:bg-blue-950 dark:text-blue-500 dark:hover:text-white":
                    pathname === link.url,
                },
              )}
            >
              {link.logo}
              {link.title}
            </Link>
          ))}
          <button
            onClick={() => {
              fetch("/api/cron", {
                method: "GET",
              });
            }}
          >
            liquify
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;

// interface Beans {[key: string]: string}[]
