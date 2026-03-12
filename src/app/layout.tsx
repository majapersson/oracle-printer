import type { Metadata, Viewport } from "next";
import "../assets/styles/main.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "The Oracle Printer",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "The Oracle",
  },
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
