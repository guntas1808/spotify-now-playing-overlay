import buildUrl from "build-url";
import {headers} from "next/headers"
import Image from "next/image";

async function getSpotifyLoginUri(): Promise<string> {
  const headerList = await headers();
  const origin = headerList.get("x-location-origin");
  const redirectUri: string = `${origin}/redirect`
  const queryParams = {
    client_id: "e260bec14eb448219fd414c6d880cd8d",
    redirect_uri: redirectUri,
    response_type: 'token',
    scope: 'user-read-currently-playing'
  }
  const spotifyAuthUri: string = "https://accounts.spotify.com/authorize"
  console.log(redirectUri);
  return  buildUrl(spotifyAuthUri, {queryParams})
}

export default async function Home() {
  const loginUri = await getSpotifyLoginUri();
  
  return (
    <>
      <div className="flex-row flex m-auto">
        <figure className="logo p-2 animate__fadeIn animate__animated">
          <Image src="/spotify.png" 
                  alt="Spotify Logo" 
                  width={100} 
                  height={100}
                  className="m-auto"/>
        </figure>
        <a href={loginUri}
          className="login-btn btn btn-soft btn-xl btn-success text-4xl p-12 rounded-full ml-2 m-auto animate__fadeIn animate__animated animate__fast">
          Login with Spotify
        </a>
      </div>
    </>
  );
}
