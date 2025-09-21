import { Player, StreamingService } from '@/types/player.types';
import { STREAMING_SERVICE } from '../constants';
import { nowPlaying } from '../api/spotify';
import SpotifyApiResponseJson from '../api/spotify.types';
import { getFormattedDuration } from '../util/playerUtils';

export async function getPlayer(streamingService: StreamingService): Promise<Player | undefined> {
    if ( streamingService === STREAMING_SERVICE.SPOTIFY ) {
        const data = await nowPlaying();
        if (data) {
            return constructSpotifyPlayer(data);
        }
    }
}

function constructSpotifyPlayer(data: SpotifyApiResponseJson): Player {
    const trackName = data.item.name;
    const trackImageUri = data.item.album.images[0].url;
    const artistNames: string[] = []
    data.item.artists.forEach(artist => {
        artistNames.push(artist.name)
    });
    const progressMillis = data.progress_ms;
    const progress = getFormattedDuration(progressMillis);
    const durationMillis = data.item.duration_ms;
    const duration = getFormattedDuration(durationMillis);
    const isPlaying = data.is_playing;

    return {trackName,trackImageUri,artistNames,progress, duration, isPlaying}
}