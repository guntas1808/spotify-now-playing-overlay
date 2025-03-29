import buildUrl from 'build-url';
import { headers } from 'next/headers'
import React from 'react'
import NowPlaying from '../nowPlaying/page';

type OverlayUriProps = {
    accessToken: string,
    uri: string
}

async function getOverlayUriProps(): Promise<OverlayUriProps> {
    const requestHeaders = await headers();
    const origin = requestHeaders.get("x-location-origin");
    const accessToken = requestHeaders.get("x-access-token") ?? "gsdg";
    const queryParams = {
        access_token: accessToken
    }

    return {
        uri: buildUrl(`${origin}/nowPlaying`, {queryParams}),
        accessToken
    }
}

export default async function OverlayPage() {
    const overlayUriProps = await getOverlayUriProps();

    return (
        <>
            <div className="w-[50%]"></div>
            <div className="flex-col m-auto">
                <NowPlaying accessToken={overlayUriProps.accessToken}></NowPlaying>
                <div className="flex-col mt-8 m-auto">
                    <span className=''>Link:</span>
                    <div className="rounded-box border-1 p-3 overflow-hidden max-w-100 max-h-60 h-30 truncate mx-auto">
                        {overlayUriProps.uri}
                    </div>
                </div>
            </div>
        </>
    )
}