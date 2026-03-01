import type { Metadata } from "next";
import "../assets/styles/main.css";

export const metadata: Metadata = {
  title: "The Oracle Printer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
