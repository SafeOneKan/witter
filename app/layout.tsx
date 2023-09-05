import "./globals.scss";
import type { Metadata } from "next";

import ReactQueryProvider from "@/components/Providers/ReactQueryProvider";
import SessionProvider from "@/components/Providers/SessionProvider";
import ThemePro from "@/components/Providers/ThemeProvider";
export const metadata: Metadata = {
  title: "Twitter",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body>
          <SessionProvider>
            <ThemePro>{children}</ThemePro>
          </SessionProvider>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
