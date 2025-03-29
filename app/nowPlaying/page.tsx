// import React, { useState } from 'react'
'use client';

type Props = {
    accessToken: string
}
const spotiyNowPlayingEndpoint = "https://api.spotify.com/v1/me/player/currently-playing";

async function getNowPlayingData(accessToken: string) {
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }
    const response = await fetch(spotiyNowPlayingEndpoint, {headers})
    console.log(response.status)
    const data = response.status === 200 ? await response.json() : {};
    console.log(JSON.stringify(data))
    return data;
}

function getFormattedDuration(millis: number): {mins: string, secs: string} {
    const mins = Math.trunc(millis/60000);
    const secs = Math.trunc(millis/1000) - mins*60;
    
    const minsStr = mins.toString();
    const secsStr = secs < 10 ? "0".concat(secs.toString()) : secs.toString();

    return {mins: minsStr, secs: secsStr};
}

const NowPlaying = async (props: Props) => {
    // const [state, setState] = useState(0);

    const {accessToken} = props;
    const data = await getNowPlayingData(accessToken);
    console.log(JSON.stringify(data));
    
    if (Object.entries(data).length === 0) {
        return (
            <></>
        );
    }

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

    // setTimeout(state === 0 ? () => setState(1) : () => setState(0), 5000)

    return (
        <div className="card card-side glass rounded-xl w-200 h-50">
            <figure className='p-5 pr-0'>
                <img className="rounded-xl max-w-50 max-h-50"
                    src={trackImageUri} 
                    alt=""/>
            </figure>
            <div className="card-body">
                <div>
                    <span className="card-title text-3xl">
                        {trackName}
                    </span>
                    <span className='text-lg'>
                        {artistNames.join(',')}
                    </span>
                </div>
                <div className="progress-bar flex">
                    <div className='text-base'>
                        {progress.mins}:{progress.secs}
                    </div>
                    <progress className="progress my-auto mx-3" value={(progressMillis/durationMillis)*100} max={100}></progress>
                    <div className='text-base'>
                        {duration.mins}:{duration.secs}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NowPlaying