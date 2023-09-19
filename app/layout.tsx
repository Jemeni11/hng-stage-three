import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Icon from "@/public/favicon-32x32.png";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

const meta = {
  image: "https://picflow.vercel.app/PicFlow_OGImage.png",
  url: "https://picflow.vercel.app",
  name: "Emmanuel Jemeni",
  title: "PicFlow",
  description: "Your favourite drag-n-drop image gallery!",
};

export const metadata: Metadata = {
  title: {
    default: meta.title,
    template: "PicFlow | %s",
  },
  keywords: [meta.title, "image", "image gallery", "photo gallery"],
  creator: meta.name,
  metadataBase: new URL(meta.url),
  description: meta.description,
  openGraph: {
    title: meta.title,
    url: meta.url,
    siteName: "vercel.app",
    locale: "en-US",
    type: "website",
    description: meta.description,
    images: meta.image,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    site: meta.url,
    description: meta.description,
    creator: "@Jemeni11",
    images: [meta.image],
  },
  themeColor: "#0fa968",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-mountainMeadow-500`}>
          {children}
          <footer className="border-t text-white">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="flex justify-center gap-4 items-center sm:justify-start">
                  <Image src={Icon} alt="logo" />
                  <span className="font-bold">PicFlow</span>
                </div>

                <p className="mt-4 text-center text-sm font-semibold lg:mt-0 lg:text-right">
                  Copyright &copy; {new Date().getFullYear()}. All rights
                  reserved.
                </p>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
