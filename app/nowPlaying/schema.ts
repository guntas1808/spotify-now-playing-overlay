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

}

export default SpotifyApiResponseJson;