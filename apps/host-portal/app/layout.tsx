import type { Metadata } from "next";
import { AppShell } from "@repo/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "LogiTrack AI - Control Room",
  description: "Main hosting portal for Logitrack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body>
        <AppShell currentPath="/">{children}</AppShell>
      </body>
    </html>
  );
}
