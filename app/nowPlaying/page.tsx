'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useReducer, useRef } from "react";
import SpotifyApiResponseJson from "./schema";
import PlayingAnimation from "./_playingAnimation/PlayingAnimation";

class TimeStamp {
    millis: number = -1;
    secs: string = "";
    mins: string = "";
}
class Player {
    constructor(init? : Partial<Player>) {
        Object.assign(this, init);
    }

    trackImageUri: string = "";
    trackName: string = "";
    artistNames: string[] = [];
    progress: TimeStamp = new TimeStamp;
    duration: TimeStamp = new TimeStamp;
    isPlaying: boolean = false;
}
const spotiyNowPlayingEndpoint = "https://api.spotify.com/v1/me/player/currently-playing";
const RE_RENDER_INTERVAL_MILLIS = 10;
const API_CALL_INTERVAL_MILLIS = 2000;

async function getNowPlayingData(accessToken: string) {
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }
    try {
        const response = await fetch(spotiyNowPlayingEndpoint, {headers});
        const data = response.status === 200 ? await response.json() : {};
        return data;
    } catch (error) {
        console.error(error);
        return {};
    }
}

function getFormattedDuration(millis: number): {mins: string, secs: string, millis: number} {
    const mins = Math.trunc(millis/60000);
    const secs = Math.trunc(millis/1000) - mins*60;
    
    const minsStr = mins.toString();
    const secsStr = secs < 10 ? "0".concat(secs.toString()) : secs.toString();

    return {mins: minsStr, secs: secsStr, millis};
}

function constructPlayer(rawData: SpotifyApiResponseJson) {
    const trackName = rawData.item.name;
    const trackImageUri = rawData.item.album.images[0].url;
    const artistNames: string[] = []
    rawData.item.artists.forEach(artist => {
        artistNames.push(artist.name)
    });
    const progressMillis = rawData.progress_ms;
    const progress = getFormattedDuration(progressMillis);
    const durationMillis = rawData.item.duration_ms;
    const duration = getFormattedDuration(durationMillis);
    const isPlaying = rawData.is_playing;

    return {trackName,trackImageUri,artistNames,progress, duration, isPlaying}
}

function getPlayerUpdate(player: Player) {
    const progress = player.progress;
    const millis = progress.millis + RE_RENDER_INTERVAL_MILLIS;
    
    return {
        ...player,
        progress: getFormattedDuration(millis)
    }
}

const NowPlaying = () => {
    const player = useRef(new Player);
    const [x, forceUpdate] = useReducer(x => x + 1, 0);
    const accessToken = useSearchParams().get("access_token") ?? "";

    useEffect(() => {
        const divisor = Math.trunc(API_CALL_INTERVAL_MILLIS/RE_RENDER_INTERVAL_MILLIS);
        if (x%divisor === 0) {
            const dataPromise = getNowPlayingData(accessToken); 
            dataPromise.then((data) => player.current = constructPlayer(data));
            return;
        } else if (player.current.isPlaying) {
            player.current = getPlayerUpdate(player.current);
        }
    }, [x])
    setTimeout(forceUpdate, RE_RENDER_INTERVAL_MILLIS)
    
    if (Object.entries(player.current).length === 0) {
        return (
            <></>
        );
    }

    return (
        <div className="card card-side rounded-xl w-450 h-80 text-[#dadade] font-(family-name:--font-geist-sans)">
            <figure className='p-5 pr-0 relative'>
                {player.current.trackImageUri &&
                    <img className="rounded-xl max-w-80 max-h-80"
                        src={player.current.trackImageUri} 
                        alt=""/>
                }
                <PlayingAnimation/>
            </figure>
            <div className="card-body m-auto ml-5">
                <div className="pb-8">
                    <div className="text-7xl tracking-normal pb-4">
                        {player.current.trackName.trim()}
                    </div>
                    <span className='text-5xl'>
                        {player.current.artistNames.join(', ')}
                    </span>
                </div>
                <div className="progress-bar flex">
                    <div className='text-4xl'>
                        {player.current.progress.mins}:{player.current.progress.secs}
                    </div>
                    <progress className="progress my-auto mx-3 rounded-xl bg-[#4f5057] h-[14px]" 
                            value={player.current.progress.millis} 
                            max={player.current.duration.millis}></progress>
                    <div className='text-4xl'>
                        {player.current.duration.mins}:{player.current.duration.secs}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NowPlaying