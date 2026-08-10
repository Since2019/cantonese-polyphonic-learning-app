import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "粤字醒｜粤语多音字学习",
  description: "每日 5 分钟，认清粤语多音字、易错字和粤拼声调。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-HK"><body>{children}</body></html>;
}
