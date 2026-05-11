import { redirect } from 'next/navigation';
import { SPOTIFY_ACCESS_TOKEN_COOKIE_NAME } from '../constants';
import { SpotifyApiResponseJson } from './spotify.types';
import { RedirectType } from 'next/navigation';

const NOW_PLAYING_API_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

async function getAccessToken(): Promise<string> {
    const accessToken = (await window.cookieStore.get(SPOTIFY_ACCESS_TOKEN_COOKIE_NAME))?.value;
    
    if (!accessToken) {
        redirect('/', RedirectType.replace);
    };

    return accessToken;
}

export async function nowPlaying():  Promise<SpotifyApiResponseJson | undefined> {
    const accessToken = await getAccessToken();   
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

