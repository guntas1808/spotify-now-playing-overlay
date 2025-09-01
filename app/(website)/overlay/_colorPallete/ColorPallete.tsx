'use client';

import { Vibrant } from 'node-vibrant/browser';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'


type DynamicColors = {
  Vibrant?: string,
  LightVibrant?: string,
  DarkVibrant?: string,
  Muted?: string,
  LightMuted?: string,
  DarkMuted?: string
}

async function updateColors(setDynamicColors: Dispatch<SetStateAction<DynamicColors>>) {
  const imageUri = document.getElementById('player-card-image')?.getAttribute('src');
  setTimeout(() => updateColors(setDynamicColors), 2000);
  if (imageUri) {
    const pallete = await Vibrant.from(imageUri).getPalette();
    // console.log(pallete);
    setDynamicColors({
      Vibrant: pallete.Vibrant?.hex,
      LightVibrant: pallete.LightVibrant?.hex,
      DarkVibrant: pallete.DarkVibrant?.hex,
      Muted: pallete.Muted?.hex,
      LightMuted: pallete.LightMuted?.hex,
      DarkMuted: pallete.DarkMuted?.hex
    })
    return;
  }
}

function getComplemetaryColor(colorHex: string | undefined) {
    if (!colorHex) {
        return;
    }

    const r = parseInt(colorHex.substring(1, 3), 16);
    const g = parseInt(colorHex.substring(3, 5), 16);
    const b = parseInt(colorHex.substring(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b)/255;

    return luminance > 0.5 ? '#000000' : '#ffffff';
}

function updateSelectedColor(event: React.MouseEvent<HTMLDivElement, MouseEvent>, setColor: Dispatch<SetStateAction<string>>) {
    const div = event.currentTarget;
    if (div.parentElement?.classList.contains('selected')) {
        return;
    }
    const selectedContainer = document.querySelector('.pallete-color-container.selected');
    selectedContainer?.classList.remove('selected');
    div.parentElement?.classList.add('selected');
    const color = div.getAttribute('data-color');
    if (color) {
        console.log(`color is ${color}`)
        setColor(color);
    } 
}

const ColorPallete = (props: {setColor: Dispatch<SetStateAction<string>>}) => {
    const [dynamicColors, setDynamicColors] = useState<DynamicColors>({});

    useEffect(() => {
        updateColors(setDynamicColors);
    }, [])

    if (!dynamicColors || Object.keys(dynamicColors).length === 0) {
        return (
            <span className="loading loading-spinner loading-lg"></span>
        )
    }

    const colorBadges = Object.keys(dynamicColors).map((color, idx) => {
        const colorKey = color as keyof DynamicColors;
        return (
            <div key={`color-pallete-container-${color}`} className={`pallete-color-container${idx === 0 ? ' selected' : ''}`}>
                <div id="color-pallete-vibrant" 
                    className="pallete-color badge badge-soft"
                    data-color={color}
                    style={{
                        backgroundColor: dynamicColors[colorKey], 
                        color: getComplemetaryColor(dynamicColors[colorKey])
                    }}
                    key={`color-pallete-${color}`}
                    onClick={(event) => updateSelectedColor(event, props.setColor)}
                >{color}</div>
            </div>      
        )
    })

    return (
        <div>{colorBadges}</div>       
    );
}

export default ColorPallete