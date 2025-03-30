import React from 'react'
import "./style.css"

const PlayingAnimation = () => {
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
            id="music">
        <div className="bar-container"><span className="bar n1">A</span></div>
        <div className="bar-container"><span className="bar n2">c</span></div>
        <div className="bar-container"><span className="bar n3">D</span></div>
      </div>
    </>
  )
}

export default PlayingAnimation