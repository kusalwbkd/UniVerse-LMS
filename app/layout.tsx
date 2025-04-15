import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";
import { Toaster } from "@/components/ui/sonner";
import Loading from "@/components/Loading";
import { Suspense } from "react";
import { CouserProvider } from "@/context/StudyContext";



export const metadata: Metadata = {
  title: "UniVerse Site",
  description: "UniVerse Site for easy learning",
  icons: {
    icon: '/favicon.ico', // or '/your-favicon.png'
  },
};

const outfit = Outfit({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
        <body
          className={outfit.className}
        >
          <Provider>
            <CouserProvider>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
            </CouserProvider>
          </Provider>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
