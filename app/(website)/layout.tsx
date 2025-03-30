import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });
  
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="light" lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>      
        <header className="p-5 h-50 flex bg-gray-50">
          <div className="card card-side">
            <figure>
              <Image
                width={60}
                height={60}
                src="/spotify.png" 
                alt=""/>
            </figure>
          </div>
          <Link
            className="my-auto ml-6 text-6xl text-green-500" 
            href="/">
              Spotify Overlay
          </Link>
        </header>
        <div className="flex h-200">
          {children}
        </div>
        <footer>
        </footer>
      </body>
    </html>
  );
}
