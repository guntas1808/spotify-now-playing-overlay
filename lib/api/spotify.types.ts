type SpotifyApiResponseJson = {
    is_playing: boolean,
    progress_ms: number,
    item: {
        name: string,
        duration_ms: number,
        album: {
            images: {
                url: string
            }[]
        },
        artists: {
            name: string
        }[]
    },

};

type SpotifyAccessTokenResponse = {
    access_token: string,
    token_type: string,
    expires_in: number,
    scope: string,
    refresh_token: string
};


export type {
    SpotifyApiResponseJson,
    SpotifyAccessTokenResponse
};