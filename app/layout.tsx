import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NotificationsProvider } from "@/components/Notifications";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trea | Discover experiences",
  description: "Discover on-chain experiences and event passes on Stellar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#131313] text-[#e5e2e1]">
        <NotificationsProvider>{children}</NotificationsProvider>
      </body>
    </html>
  );
}
