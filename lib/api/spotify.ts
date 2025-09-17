import SpotifyApiResponseJson from "./spotify.types";


const ACCESS_TOKEN_COOKIE_NAME = 'spotify-access-token';
const NOW_PLAYING_API_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

export async function nowPlaying():  Promise<SpotifyApiResponseJson | undefined> {
    const queryParams = new URLSearchParams(location.search);
    const accessTokenFromCookie = (await window.cookieStore.get(ACCESS_TOKEN_COOKIE_NAME))?.value;
    const accessToken = accessTokenFromCookie ?? queryParams.get("access_token") ?? "";
    
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }
    try {
        const response = await fetch(NOW_PLAYING_API_ENDPOINT, {headers});
        const data = response.status === 200 ? await response.json() : {};
        return data;
    } catch (error) {
        console.error(error);
    }
}