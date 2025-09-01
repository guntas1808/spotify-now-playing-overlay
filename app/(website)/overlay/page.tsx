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
  console.log(txtColor);

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col m-auto  w-[45%] overflow-clip h-full">
        <div className="flex flex-col h-[50%] justify-center m-auto">
          <label htmlFor="">
            <span className="floating-label text-lg">
              Overlay Preview
            </span>
            <div className="bg-base-200 p-5 pt-10 m-auto w-[800px] rounded-box h-[300px]">
              <Suspense>
                <PlayerCard width="700" bgType={bgType} bgColor={bgColor} txtColor={txtColor} opacity={opacity} />
              </Suspense>
            </div>
          </label>
        </div>
        <div className="flex flex-col h-[50%] m-auto pt-0">
            <LinkTextBox bgType={bgType} bgColor={bgColor} txtColor={txtColor} opacity={opacity} width={width} />
        </div>
      </div>
      <div className="w-[55%] h-full flex overflow-clip">
        <div className="h-[90%] m-auto w-[80%] animate__animated animate__fadeIn">
          {/* <h1 className="m-auto text-center text-3xl">Customize</h1> */}
          <div className="customization-form-container flex flex-col mt-5 gap-y-3 border-gray-700">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 pb-8 flex justify-center flex-col">
              <legend className="fieldset-legend text-lg">Background</legend>
              <label className="select border-inherit m-auto ">
                <span className="label">Type:</span>
                <select className="select-success" 
                        defaultValue={bgType || 'glass'} 
                        onChange={(event: ChangeEvent<HTMLSelectElement>) => setBgType(event.target.value)}>
                  <option value="transparent">Transparent</option>
                  <option value="glass">Glass</option>
                  <option value="solid">Solid</option>
                </select>
              </label>
              {bgType == "solid" &&
                <fieldset className="fieldset bg-base-300 border-base-300 mb-3 m-auto w-[700px] rounded-box border p-4">
                  <legend className="fieldset-legend text-base">Color</legend>
                  <div className="tabs bg-base-300 tabs-box m-auto w-[100%]">
                    <input type="radio" name="my_tabs_2" className="tab" aria-label="Dynamic" />
                    <div className="tab-content">
                      <ColorPallete setColor={setBgColor}/>
                    </div>
                  
                    <input type="radio" name="my_tabs_2" className="tab" aria-label="Static" defaultChecked />
                    <div className="tab-content">
                      <label
                        htmlFor=""
                        className="input input-success border-inherit m-auto w-[80%]"
                      >
                        <span className="label">Pick a color:</span>
                        <input type="color" onChange={(event: ChangeEvent<HTMLInputElement>) => setBgColor(event.target.value)}/>
                      </label>
                    </div>
                  </div>
                </fieldset>
              }
              {bgType == "solid" ?
                <label
                  className="input border-inherit m-auto">
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
              <fieldset className="fieldset bg-base-300 border-base-300 mb-3 m-auto w-[700px] rounded-box border p-4">
                <legend className="fieldset-legend text-base">Color</legend>
                <div className="tabs bg-base-300 tabs-box m-auto w-[100%]">
                  <input type="radio" name="my_tabs_1" className="tab" aria-label="Dynamic" />
                  <div className="tab-content">
                    <ColorPallete setColor={setTxtColor}/>
                  </div>
                  
                  <input type="radio" name="my_tabs_1" className="tab" aria-label="Static" defaultChecked />
                  <div className="tab-content">
                    <label
                      htmlFor=""
                      className="input border-inherit m-auto"
                    >
                      <span className="label">Pick a Color:</span>
                      <input type="color" 
                              defaultValue={"#dcdcde"} 
                              onChange={(event: ChangeEvent<HTMLInputElement>) => setTxtColor(event.target.value)}/>
                    </label>
                  </div>
                </div>
              </fieldset>
            </fieldset>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 pb-8">
              <legend className="fieldset-legend text-lg">Size</legend>
              <label className="input m-auto border-inherit">
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