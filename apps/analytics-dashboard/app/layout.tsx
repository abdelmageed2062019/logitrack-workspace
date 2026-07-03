import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics Dashboard",
  description: "Analytics and reporting dashboard",
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
