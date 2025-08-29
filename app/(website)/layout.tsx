import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import 'animate.css';

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
    <html data-theme="forest" lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>      
        <div className="h-screen w-full">
          <header className="h-[15%] p-5 flex bg-neutral text-neutral-content">
            <div className="card card-side">
              <figure>
                <Image
                  width={70}
                  height={70}
                  src="/spotify.png" 
                  alt=""/>
              </figure>
            </div>
            <Link
              className="my-auto ml-6 text-5xl text" 
              href="/">
                Spotify Overlay for OBS
            </Link>
          </header>
          <div className="h-[80%]">
            {children}
          </div>
          <footer className="h-[5%]">
            
          </footer>
        </div>
      </body>
    </html>
  );
}
