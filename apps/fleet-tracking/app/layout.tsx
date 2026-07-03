import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fleet Tracking",
  description: "Live fleet tracking and monitoring",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
