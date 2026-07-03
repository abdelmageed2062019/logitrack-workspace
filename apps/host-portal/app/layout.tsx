import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Host Portal",
  description: "Main hosting portal for Logitrack",
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
