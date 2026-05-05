import { ACCESS_TOKEN_HEADER_NAME, LOCATION_ORIGIN_HEADER_NAME } from '@/lib/middleware-constants';
import buildUrl from 'build-url';
import crypto from 'crypto';
import { cookies, headers } from 'next/headers'
import Image from 'next/image';
import { redirect, RedirectType } from 'next/navigation';

async function handleLogin() {
  'use server';
  const headerList = await headers();
  let origin = headerList.get(LOCATION_ORIGIN_HEADER_NAME) || 'http://127.0.0.1:3000';
  
  // Spotify does not allow 'localhost' in redirect URIs. Use the loopback IP instead.
  origin = origin.replace(/^http:\/\/localhost/, 'http://127.0.0.1');
  const redirectUri = `${origin}/redirect`;
  console.log(origin);

  const verifier = crypto.randomBytes(64).toString('base64url');
  const challenge = crypto.createHash('sha256').update(verifier).digest('base64url');

  (await cookies()).set('spotify_code_verifier', verifier);

  const queryParams = {
    client_id: 'e260bec14eb448219fd414c6d880cd8d',
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'user-read-currently-playing',
    code_challenge_method: 'S256',
    code_challenge: challenge,
  };

  const spotifyAuthUri = 'https://accounts.spotify.com/authorize';
  redirect(buildUrl(spotifyAuthUri, { queryParams }));
}

export default async function Home() {
  const headerList = await headers();

  if (headerList.get(ACCESS_TOKEN_HEADER_NAME)) {
    redirect('/overlay', RedirectType.replace);
  }
  
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
        <form action={handleLogin}>
          <button type='submit'
            className='login-btn btn btn-soft btn-xl btn-success text-4xl p-12 rounded-full ml-2 m-auto animate__fadeIn animate__animated animate__fast'>
            Login with Spotify
          </button>
        </form>
      </div>
    </>
  );
}
