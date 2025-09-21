'use client';

import { SPOTIFY_TOKEN_COOKIE_NAME } from '@/lib/constants';
import React, { useEffect } from 'react'


const Redirect = () => {
  useEffect(() => {
    const urlHash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlHash.get('access_token');
    const validityDurationInSecs = parseInt(urlHash.get('expires_in') ?? '0') ;
    const expirationTimestamp = Date.now() + validityDurationInSecs*1000;
    
    if (accessToken) {
        window.cookieStore.set({
        name: SPOTIFY_TOKEN_COOKIE_NAME,
        value: accessToken,
        expires: expirationTimestamp
        });
    }
    window.location.replace(`${location.origin}/overlay`);
  }, [])
  return (
    <div></div>
  );
}

export default Redirect