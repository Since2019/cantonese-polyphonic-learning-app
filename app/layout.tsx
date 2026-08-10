import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yue-zi-xing.judaozhong.chatgpt.site"),
  title: "粤字醒｜粤语多音字学习",
  description: "每日 5 分钟，认清粤语多音字、易错字和粤拼声调。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "粤字醒｜一字多音，唔好读错。",
    description: "认清粤语多音字、易错字和粤拼声调。",
    images: [{ url: "/og.png", width: 2184, height: 941, alt: "粤字醒粤语学习 App" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "粤字醒｜一字多音，唔好读错。",
    description: "认清粤语多音字、易错字和粤拼声调。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-HK"><body>{children}</body></html>;
}
