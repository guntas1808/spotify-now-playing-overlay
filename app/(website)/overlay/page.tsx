'use client';

import "./style.sass";
import PlayerCard from "@/app/nowPlaying/_playerCard/PlayerCard";
import { ChangeEvent, Suspense, useState } from "react";
import ColorPallete from "./_colorPallete/ColorPallete";
import LinkTextBox from "./_linkTextBox/LinkTextBox";


export default function OverlayPage() {
  const [bgType, setBgType] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("");
  const [txtColor, setTxtColor] = useState<string>("");
  const [opacity, setOpacity] = useState<number>(100);
  const [width, setWidth] = useState<number>(1500);

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col m-auto  w-[45%] overflow-clip h-full">
        <div className="flex flex-col h-[50%] justify-center m-auto">
          <div className="mb-3 text-xl">Preview:</div>
          <Suspense>
            <PlayerCard width="700" bgType={bgType} bgColor={bgColor} txtColor={txtColor} opacity={opacity} />
          </Suspense>
        </div>
        <div className="flex flex-col h-[50%] justify-center m-auto pt-0">
            <LinkTextBox bgType={bgType} bgColor={bgColor} txtColor={txtColor} opacity={opacity} width={width} />
        </div>
      </div>
      <div className="w-[55%] h-full flex">
        <div className="h-[70%] m-auto w-[80%]">
          {/* <h1 className="m-auto text-center text-3xl">Customize</h1> */}
          <div className="flex flex-col mt-5 gap-y-3 border-gray-700">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 pb-8">
              <legend className="fieldset-legend text-lg">Background</legend>
              <label className="select border-inherit m-auto  w-[400px]">
                <span className="label">Type:</span>
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
                  <span className="label">Color:</span>
                  <input type="color" onChange={(event: ChangeEvent<HTMLInputElement>) => setBgColor(event.target.value)}/>
                </label>
                : null
              }
              {bgType == "solid" ?
                <label
                  className="input m-auto w-[400px]">
                  <span className="label">Opacity:</span>
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
            </fieldset>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 pb-8">
              <legend className="fieldset-legend text-lg">Text</legend>
              <div className="tabs tabs-box m-auto w-[100%]">
                <input type="radio" name="my_tabs_1" className="tab" aria-label="Dynamic Colors" />
                <div className="tab-content">
                  <ColorPallete/>
                </div>
                
                <input type="radio" name="my_tabs_1" className="tab" aria-label="Static Colors" defaultChecked />
                <div className="tab-content">
                  <label
                    htmlFor=""
                    className="input border-inherit m-auto w-[400px]"
                  >
                    <span className="label">Text Color:</span>
                    <input type="color" 
                            defaultValue={"#dcdcde"} 
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setTxtColor(event.target.value)}/>
                  </label>
                </div>
              </div>
            </fieldset>
            <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4 pb-8">
              <legend className="fieldset-legend text-lg">Size</legend>
              <label className="input m-auto w-[400px]">
                <span className="label">Width</span>
                <input type="number" 
                        defaultValue={1500} 
                        className="grow" 
                        placeholder="1500"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setWidth(parseInt(event.target.value))} />
                <span className="badge badge-neutral badge-xs">px</span>
              </label>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}