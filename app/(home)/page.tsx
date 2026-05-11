import { SPOTIFY_ACCESS_TOKEN_COOKIE_NAME } from '@/lib/constants';
import buildUrl from 'build-url';
import crypto from 'crypto';
import { cookies, headers } from 'next/headers'
import Image from 'next/image';
import { redirect, RedirectType } from 'next/navigation';

const ORIGIN_HEADER_KEY = 'origin';
const SPOTIFY_AUTH_URI = 'https://accounts.spotify.com/authorize';
const SPOTIFY_CLIENT_ID = 'e260bec14eb448219fd414c6d880cd8d';

async function handleLogin() {
  'use server';
  const headerList = await headers();
  const origin = headerList.get(ORIGIN_HEADER_KEY);
  const redirectUri = `${origin}/redirect`;

  const verifier = crypto.randomBytes(64).toString('base64url');
  const challenge = crypto.createHash('sha256').update(verifier).digest('base64url');

  (await cookies()).set('spotify_code_verifier', verifier);

  const queryParams = {
    client_id: SPOTIFY_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'user-read-currently-playing',
    code_challenge_method: 'S256',
    code_challenge: challenge,
  };

  redirect(buildUrl(SPOTIFY_AUTH_URI, { queryParams }));
}

export default async function Home() {
  if ((await cookies()).get(SPOTIFY_ACCESS_TOKEN_COOKIE_NAME)) {
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
