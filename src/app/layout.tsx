import Provider from "@/providers/SessionProviders";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Redaxa",
  description:
    "Redaxa helps you remove sensitive info from resumes so they’re safe to share anywhere.",
  icons: {
    icon: "/redaxaIcon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
