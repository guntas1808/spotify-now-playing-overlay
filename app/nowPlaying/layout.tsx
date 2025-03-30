import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });
  
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function NowPlayingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="dark" lang="en">
        <body 
            className={`${geistSans.variable} ${geistMono.variable} bg-transparent antialiased`}>         
            <Suspense>
                {children}
            </Suspense>
        </body>
    </html>
  );
}
