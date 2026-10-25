import type { Metadata } from "next";
import { Dancing_Script, Playfair_Display } from "next/font/google";
import { wedding } from "@/content/wedding";
import "./globals.css";

// Cả hai font phải có subset `vietnamese` để chữ có dấu hiện đúng.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: `${wedding.groom.shortName} & ${wedding.bride.shortName}`,
  description: wedding.invitation.body,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
