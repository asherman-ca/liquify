import Image from "next/image";
import Link from "next/link";
import { Coins, Home, PiggyBank } from "lucide-react";
import { ReactComponentElement } from "react";

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
  {
    title: "Trade",
    url: "/trade",
    logo: <Coins />,
  },
];

const Sidebar = ({ children, ...props }: SideBarProps) => {
  return (
    <div className="flex">
      <div
        id="sidebar"
        {...props}
        className="border-r-1 flex flex-col gap-4 border-gray-300 p-4"
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
              className="flex items-center gap-2 rounded-full p-4 font-medium hover:bg-gray-100"
            >
              {link.logo}
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;

// interface Beans {[key: string]: string}[]
