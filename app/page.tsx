import buildUrl from "build-url";
import {headers} from "next/headers"

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
    <div className="m-auto">
      <a href={loginUri}
        className="text-3xl border rounded-full pt-5 pb-5 pl-7 pr-7">
        Login to Spotify
        </a>
    </div>
  );
}
