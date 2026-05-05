import { SPOTIFY_TOKEN_COOKIE_NAME } from '../constants';
import SpotifyApiResponseJson from './spotify.types';

const NOW_PLAYING_API_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_API_ENDPOINT = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = 'e260bec14eb448219fd414c6d880cd8d';

export async function nowPlaying():  Promise<SpotifyApiResponseJson | undefined> {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    
    let accessToken = (await (window as any).cookieStore.get(SPOTIFY_TOKEN_COOKIE_NAME))?.value;

    // If no token exists but an auth code is present, exchange it using PKCE
    if (!accessToken && code) {
        const verifier = (await (window as any).cookieStore.get('spotify_code_verifier'))?.value;
        if (verifier) {
            accessToken = await exchangeCodeForToken(code, verifier);
            // Clear the code from the URL to prevent re-exchange attempts
            window.history.replaceState({}, document.title, location.pathname);
        }
    }

    if (!accessToken) return undefined;
    
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }
    try {
        const response = await fetch(NOW_PLAYING_API_ENDPOINT, {headers});
        return response.status === 200 ? await response.json() : undefined;
    } catch (error) {
        console.error(error); // eslint-disable-line no-console
        return undefined;
    }
}

async function exchangeCodeForToken(code: string, verifier: string): Promise<string | undefined> {
    let origin = location.origin;
    origin = origin.replace(/^http:\/\/localhost/, 'http://127.0.0.1');

    const response = await fetch(TOKEN_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: `${origin}/redirect`,
            code_verifier: verifier,
        }),
    });
    console.log(location.origin);
    if (response.ok) {
        const data = await response.json();
        await (window as any).cookieStore.set(SPOTIFY_TOKEN_COOKIE_NAME, data.access_token);
        await (window as any).cookieStore.delete('spotify_code_verifier');
        return data.access_token;
    }
    return undefined;
}