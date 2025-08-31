'use client';

import BuildUrl from 'build-url';
import React, { useEffect, useState } from 'react'


type Props = {
    width: number,
    bgType: string,
    bgColor: string,
    txtColor: string,
    opacity: number
}
const COOKIE_NAME = 'spotify-access-token';

const LinkTextBox = (props: Props) => {
    const [accessToken, setAccessToken] = useState<string>('');
    const [origin, setOrigin] = useState<string>('');

    const urlString = BuildUrl('', {
                path: 'nowPlaying',
        queryParams: {
            ...(props.bgType ? {type: props.bgType} : {}),
            ...(props.bgColor ? {bgcolor: props.bgColor} : {}),
            ...(props.txtColor ? {txtcolor: props.txtColor} : {}),
            ...(props.opacity ? {opacity: props.opacity.toString()} : {}),
            ...(props.width ? {width: props.width.toString()} : {})
        }
    });

    useEffect(() => {
        const updateAccessToken = async () => {
            const cookie = await window.cookieStore.get(COOKIE_NAME);
            if (!cookie || !cookie.value) {
                location.replace(location.origin);
                return;
            }
            
            setTimeout(updateAccessToken, 120000);
            setAccessToken(cookie.value);
        };
        
        setOrigin(location.origin);
        updateAccessToken();
    }, [])

    return <>
        <div className="mb-3 text-xl">Link:</div>
        {urlString && urlString !== "" ?
            <div className="animate__animated animate__fadeIn bg-base-300 rounded-box p-3 w-[700px] text-balance break-words overflow-hidden">
                {`${origin}${urlString}?access_token=${accessToken}`}
            </div> :
            <div className="skeleton h-28 w-[700px]"/>
        }           
    </>;
}

export default LinkTextBox;