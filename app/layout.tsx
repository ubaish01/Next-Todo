import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./header";
import { ContextProvider } from "@/components/Clients";
import "../styles/app.scss"
import { Toast } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo-app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <ContextProvider>
          <>
            <Header />
            {children}
            {/* <Toast /> */}
          </>
        </ContextProvider>
      </body>
    </html>
  );
}
