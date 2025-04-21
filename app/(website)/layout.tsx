import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"

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
    <html data-theme="dark" lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>      
        <div className="h-screen w-full">
          <header className="h-[20%] p-5 flex bg-neutral">
            <div className="card card-side">
              <figure>
                <Image
                  width={90}
                  height={90}
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
          <div className="h-[70%]">
            {children}
          </div>
          <footer className="h-[10%] bg-neutral">
            dsfafd
          </footer>
        </div>
      </body>
    </html>
  );
}
