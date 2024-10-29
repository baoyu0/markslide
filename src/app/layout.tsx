import { Metadata } from "next";
import { Providers } from "./providers";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "Markslide",
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION || "一个优雅的文档转换和预览工具",
  icons: {
    icon: [
      {
        url: "/icon?<generated>",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-icon?<generated>",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
