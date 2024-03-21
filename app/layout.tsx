import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ToasterProvider } from "@/components/providers/toaster-provider";
import Navbar from "@/components/landing/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Juan Carlos Guzman",
  description: "Mentoría Inmobiliaria por un referente Nacional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
