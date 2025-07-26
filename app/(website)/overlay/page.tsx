'use client';

import buildUrl from "build-url";
import { useSearchParams } from "next/navigation";
import "./style.sass";
import PlayerCard from "@/app/nowPlaying/_playerCard/PlayerCard";
import { Suspense } from "react";

function LinkTextBox() {
  const queryParams = useSearchParams();
  const uri = buildUrl(`/nowPlaying`, {
    queryParams: {
      access_token: queryParams.get("access_token") ?? "",
      width: "500",
    },
  });

  return <>
    <div className="mb-3 text-xl">Link:</div>
    <div className="rounded-box border border-neutral p-3 h-28">
      {`${window.location.origin}${uri}`}
    </div>
  </>
}

export default function OverlayPage() {
  

  
  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col m-auto  w-[40%] overflow-clip h-full">
          <div className="flex flex-col h-[50%] justify-center m-auto">
            <div className="mb-3 text-xl">Preview:</div>
            <Suspense>
              <PlayerCard width="700"/>
            </Suspense>
          </div>
        <div className="flex flex-col h-[50%] justify-center m-auto pt-0">
          <Suspense>
            <LinkTextBox/>
          </Suspense>
        </div>
      </div>
      <div className="w-[60%] h-full flex">
        <div className="h-[70%] m-auto w-[80%]">
          <h1 className="m-auto text-center text-3xl">Customize</h1>
          <div className="flex flex-col mt-5 gap-y-3 border-gray-700">
            <label className="select border-inherit m-auto  w-[400px]">
              <span className="label">Background: </span>
              <select className="select-success" defaultValue={"glass"}>
                <option value="transparent">Transparent</option>
                <option value="glass">Glass</option>
                <option value="solid">Solid</option>
              </select>
            </label>
            <label
              htmlFor=""
              className="input input-success border-inherit m-auto w-[400px]"
            >
              <span className="label ">Background Color:</span>
              <input type="color" />
            </label>
            <label
              htmlFor=""
              className="input  border-inherit m-auto w-[400px]"
            >
              <span className="label">Text Color:</span>
              <input type="color" defaultValue={"#dcdcde"} />
            </label>
            <label
              className="input m-auto  w-[400px]">
              <span className="label">Background Opacity</span>
              <input 
                type="range"
                min="0"
                max="100"
                className="range [--range-fill:0]" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}