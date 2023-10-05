import { Metadata } from "next/types";
import Providers from "../providers/Providers";
import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authentication",
  description: "A Form with full authentication",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Providers>
          <div className="min-h-[calc(100dvh)]">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
