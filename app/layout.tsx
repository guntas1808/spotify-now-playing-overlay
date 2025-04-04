import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"

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
    <html data-theme="light" lang="en">
        <body 
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}>         
            {children}
        </body>
    </html>
  );
}
