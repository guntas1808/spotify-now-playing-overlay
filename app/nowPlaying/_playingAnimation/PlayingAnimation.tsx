import React from "react";
import "./style.css";

type Props = {
  color: string;
};

const PlayingAnimation = (props: Props) => {
  const baseColorHex = props.color;
  return (
    <>
      <div className="now playing
                  absolute flex flex-row
                  opacity-80
                  right-4 bottom-9
                  w-auto h-[65]
                  bg-[#4f5057]
                  rounded-xl
                  p-[7.5]"
        id="music"
        style={{
          backgroundColor: `color-mix(in srgb, ${baseColorHex} 20%, transparent)`,
        }}
      >
        {[1, 2, 3].map((idx) => (
          <div key={idx} className="bar-container">
            <span
              className={`bar n${idx} bg-[]`}
              style={{ backgroundColor: baseColorHex }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PlayingAnimation;
