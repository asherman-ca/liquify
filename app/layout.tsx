import Nav from "@/components/Nav";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/Content";
import { MyUserContextProvider } from "@/hooks/useUser";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen`}>
        <ThemeProvider>
          <SupabaseProvider>
            <MyUserContextProvider>
              <Sidebar className="p-8">
                <Content>
                  {children}
                  <Toaster />
                </Content>
              </Sidebar>
            </MyUserContextProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
