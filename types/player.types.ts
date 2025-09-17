export type Duration = {
    millis: number;
    display: {
        mins: string,
        secs: string
    }
}

export type Player = {
    trackImageUri: string;
    trackName: string;
    artistNames: string[];
    progress: Duration;
    duration: Duration;
    isPlaying: boolean;
}

export type StreamingService = 'spotify' | 'applemusic';