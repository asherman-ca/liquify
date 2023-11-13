import "./globals.css";
import type { Metadata } from "next";
import SupabaseProvider from "@/providers/SupabaseProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/Content";
import { MyUserContextProvider } from "@/hooks/useUser";
import { Toaster } from "sonner";
import ConfettiProvider from "@/providers/ConfettiProvider";
import ModalProvider from "@/providers/ModalProvider";
import getCoins from "@/actions/getCoins";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react";

// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Liquify",
  description: "Liquify is a crypto trading platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coins = await getCoins();

  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <ThemeProvider>
          <SupabaseProvider>
            <MyUserContextProvider>
              <Sidebar className="p-8">
                <Content>
                  {children}
                  <Analytics />
                  <Toaster />
                  <ConfettiProvider />
                  <ModalProvider coins={coins} />
                </Content>
              </Sidebar>
            </MyUserContextProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
