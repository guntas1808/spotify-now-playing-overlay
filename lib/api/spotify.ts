import { SpotifyApiResponseJson } from './spotify.types';
import { getAccessToken } from '../util/accessTokenUtils';

const NOW_PLAYING_API_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

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

