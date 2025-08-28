'use client';

import "./style.sass";
import PlayerCard from "@/app/nowPlaying/_playerCard/PlayerCard";
import BuildUrl from "build-url";
import { ChangeEvent, Suspense, useEffect, useState } from "react";

const COOKIE_NAME = 'spotify-access-token';

async function checkAndUpdateAccessTokenCookie() {
  const cookie = await window.cookieStore.get(COOKIE_NAME);
  if(cookie) {
    return;
  }

  const urlHash = new URLSearchParams(location.hash.substring(1));
  const validityDurationInSecs = parseInt(urlHash.get('expires_in') ?? '0') ;
  const expirationTimestamp = Date.now() + validityDurationInSecs*100;
  const accessToken = urlHash.get('access_token');

  if (accessToken) {
    window.cookieStore.set({
      name: COOKIE_NAME,
      value: accessToken,
      expires: expirationTimestamp
    });
  } else {
    // location.replace(location.origin);
  }
}

export default function OverlayPage() {
  const [bgType, setBgType] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("");
  const [txtColor, setTxtColor] = useState<string>("");
  const [opacity, setOpacity] = useState<number>(100);
  const [width, setWidth] = useState<number>(1500);
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    checkAndUpdateAccessTokenCookie();
    const updateLinkTextBox = async (bgType: string, bgColor: string, txtColor: string, opacity: number, width: number) => {
      const cookie = await window.cookieStore.get(COOKIE_NAME);
      if (!cookie) {
        return;
      }

      const token = cookie.value ?? '';
      const urlString = BuildUrl(location.origin, {
        path: 'nowPlaying',
        queryParams: {
          bg: bgType,
          bgcolor: bgColor,
          txtcolor: txtColor,
          opacity: opacity.toString(),
          width: width.toString(),
          access_token: token
        }
      });
      setUrl(urlString);
    };

    updateLinkTextBox(bgType, bgColor, txtColor, opacity, width);
  })

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col m-auto  w-[40%] overflow-clip h-full">
          <div className="flex flex-col h-[50%] justify-center m-auto">
            <div className="mb-3 text-xl">Preview:</div>
            <Suspense>
              <PlayerCard width="700" bgType={bgType} bgColor={bgColor} txtColor={txtColor} opacity={opacity} />
            </Suspense>
          </div>
        <div className="flex flex-col h-[50%] justify-center m-auto pt-0">
            <div className="mb-3 text-xl">Link:</div>
            {url && url !== "" ?
              <div className="rounded-box border border-neutral p-3 w-[700px] overflow-hidden">
                {url}
              </div> :
              <div className="skeleton h-28 w-[700px]"/>
            }
        </div>
      </div>
      <div className="w-[60%] h-full flex">
        <div className="h-[70%] m-auto w-[80%]">
          <h1 className="m-auto text-center text-3xl">Customize</h1>
          <div className="flex flex-col mt-5 gap-y-3 border-gray-700">
            <label className="select border-inherit m-auto  w-[400px]">
              <span className="label">Background: </span>
              <select className="select-success" 
                      defaultValue={bgType || 'glass'} 
                      onChange={(event: ChangeEvent<HTMLSelectElement>) => setBgType(event.target.value)}>
                <option value="transparent">Transparent</option>
                <option value="glass">Glass</option>
                <option value="solid">Solid</option>
              </select>
            </label>
            {bgType == "solid" ?
              <label
                htmlFor=""
                className="input input-success border-inherit m-auto w-[400px]"
              >
                <span className="label">Background Color:</span>
                <input type="color" onChange={(event: ChangeEvent<HTMLInputElement>) => setBgColor(event.target.value)}/>
              </label>
              : null
            }
            <label
              htmlFor=""
              className="input  border-inherit m-auto w-[400px]"
            >
              <span className="label">Text Color:</span>
              <input type="color" 
                      defaultValue={"#dcdcde"} 
                      onChange={(event: ChangeEvent<HTMLInputElement>) => setTxtColor(event.target.value)}/>
            </label>
            {bgType == "solid" ?
              <label
                className="input m-auto w-[400px]">
                <span className="label">Background Opacity</span>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  defaultValue={100}
                  className="range [--range-fill:0]"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setOpacity(parseInt(event.target.value))} />
              </label>
              : null
            }
            <label className="input m-auto w-[400px]">
              <span className="label">Width</span>
              <input type="number" 
                      defaultValue={1500} 
                      className="grow" 
                      placeholder="1500"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => setWidth(parseInt(event.target.value))} />
              <span className="badge badge-neutral badge-xs">px</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}