import { ACCESS_TOKEN_HEADER_NAME, LOCATION_ORIGIN_HEADER_NAME } from '@/middleware';
import buildUrl from 'build-url';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import {headers} from 'next/headers'
import Image from 'next/image';
import { redirect, RedirectType } from 'next/navigation';

async function getSpotifyLoginUri(headerList: ReadonlyHeaders): Promise<string> {
  const origin = headerList.get(LOCATION_ORIGIN_HEADER_NAME);
  const redirectUri: string = `${origin}/redirect`
  const queryParams = {
    client_id: 'e260bec14eb448219fd414c6d880cd8d',
    redirect_uri: redirectUri,
    response_type: 'token',
    scope: 'user-read-currently-playing'
  }
  const spotifyAuthUri: string = 'https://accounts.spotify.com/authorize'
  
  return  buildUrl(spotifyAuthUri, {queryParams})
}

export default async function Home() {
  const headerList = await headers();

  if (headerList.get(ACCESS_TOKEN_HEADER_NAME)) {
    redirect('/overlay', RedirectType.replace);
  }
  const loginUri = await getSpotifyLoginUri(headerList);
  
  return (
    <>
      <div className='flex-row flex m-auto'>
        <figure className='logo p-2 animate__fadeIn animate__animated'>
          <Image src='/spotify.png' 
                  alt='Spotify Logo' 
                  width={100} 
                  height={100}
                  className='m-auto'/>
        </figure>
        <a href={loginUri}
          className='login-btn btn btn-soft btn-xl btn-success text-4xl p-12 rounded-full ml-2 m-auto animate__fadeIn animate__animated animate__fast'>
          Login with Spotify
        </a>
      </div>
    </>
  );
}
