import type { Metadata } from "next";
import "./globals.css";
import Web3Provider from "@/providers/Web3Provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Zync - Decentralized Self-Destruct Chat App",
  description: "A futuristic messaging app that offers you identity-controlled messaging with self-destruct features and no central authority.",
  openGraph: {
    title: "Zync",
    description: "Decentralized & self-destructing messaging.",
    url: "https://zync-app.vercel.app",
    siteName: "Zync",
    images: [
      {
        url: "https://zync-app.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zync Hero Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Toaster theme="dark" richColors={true} position="top-right" expand={true} />
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
