import { redirect, RedirectType } from 'next/navigation';
import { SPOTIFY_ACCESS_TOKEN_COOKIE_NAME, SPOTIFY_REFRESH_TOKEN_COOKIE_NAME } from '../constants';
import { SpotifyAccessTokenResponse } from '../api/spotify.types';

const TOKEN_REFRESH_ENDPOINT = 'https://accounts.spotify.com/api/token';

async function refreshAccessToken(refreshToken: string): Promise<string> { 
    const response = await fetch(TOKEN_REFRESH_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: ''
        })
    });
    
    if (response.ok) {
        const data: SpotifyAccessTokenResponse = await response.json();
        const accessToken = data.access_token;
        
        await window.cookieStore.set({
            name: SPOTIFY_ACCESS_TOKEN_COOKIE_NAME,
            value: data.access_token,
            expires: Date.now() + data.expires_in * 1000
        });
        await window.cookieStore.set({
            name: SPOTIFY_REFRESH_TOKEN_COOKIE_NAME,
            value: data.refresh_token
        });
        return accessToken;
    } 
    
    redirect('/', RedirectType.replace);
}

export async function getAccessToken(): Promise<string> {
    const accessToken = (await window.cookieStore.get(SPOTIFY_ACCESS_TOKEN_COOKIE_NAME))?.value;
    if (accessToken) {
        return accessToken;
    };

    const refreshToken = (await window.cookieStore.get(SPOTIFY_REFRESH_TOKEN_COOKIE_NAME))?.value;
    if (refreshToken) {
        return await refreshAccessToken(refreshToken);
    }
    
    redirect('/', RedirectType.replace);
}
