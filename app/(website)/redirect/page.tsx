'use client';

import { SpotifyAccessTokenResponse } from '@/lib/api/spotify.types';
import { SPOTIFY_ACCESS_TOKEN_COOKIE_NAME } from '@/lib/constants';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SPOTIFY_TOKEN_API_ENDPOINT = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = 'e260bec14eb448219fd414c6d880cd8d';

async function exchangeCodeForToken(code: string, verifier: string): Promise<SpotifyAccessTokenResponse | undefined> {
    const response = await fetch(SPOTIFY_TOKEN_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: `${location.origin}/redirect`,
            code_verifier: verifier,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        await window.cookieStore.delete('spotify_code_verifier');
        return data;
    }
    return undefined;
}

async function authenticateAndRedirect(router: AppRouterInstance) {
  const authCode = new URLSearchParams(window.location.search).get('code');
    const verifier = (await window.cookieStore.get('spotify_code_verifier'))?.value;

    if (!authCode || !verifier) {
      router.replace('/');
      return;
    }

    const response = await exchangeCodeForToken(authCode, verifier);
    
    if (!response) {
      router.replace('/');
      return;
    }

    await window.cookieStore.set({
      name: SPOTIFY_ACCESS_TOKEN_COOKIE_NAME,
      value: response.access_token,
      expires: Date.now() + response.expires_in * 1000
    });
    window.location.replace(`${location.origin}/overlay`);
}

export default function Redirect () {
  const router = useRouter();

  useEffect(() => {
    authenticateAndRedirect(router);
  }, [router]);
}