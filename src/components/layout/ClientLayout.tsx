"use client";

interface ClientLayoutProps {
  children: React.ReactNode;
  fonts: {
    geistSans: { variable: string };
    geistMono: { variable: string };
  };
}

export default function ClientLayout({ children, fonts }: ClientLayoutProps) {
  const { geistSans, geistMono } = fonts;
  
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
} 