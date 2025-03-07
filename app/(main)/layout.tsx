import type { Metadata } from "next";
import { ResponsiveLayout } from "@/app/components/ResponsiveLayout";
import localFont from "next/font/local";
import "@/app/components/Header.css";
import "@/app/globals.css";

// Import local fonts
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shiyuan Li",
  description: "Personal portfolio of Shiyuan Li",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} text-white`}>
        <ResponsiveLayout>
          {children}
        </ResponsiveLayout>
      </body>
    </html>
  );
}
