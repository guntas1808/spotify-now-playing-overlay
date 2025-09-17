import { ReadonlyURLSearchParams } from "next/navigation";
import { Vibrant } from "node-vibrant/browser";
import { getPlayer } from "@/lib/adapter/nowPlaying";
import { STREAMING_SERVICE } from "@/lib/constants";
import { getFormattedDuration } from "@/lib/util/playerUtils";
import { getHexWithOpacity, isDynamicColor } from "@/lib/util/colorUtils";
import { PlayerCardType, Props, Styles } from "./player-card.types";
import { DEFAULTS, RE_RENDER_INTERVAL_MILLIS } from "./constants";

export async function getActualPlayerUpdate(styles: Styles) {
    const player = await getPlayer(STREAMING_SERVICE.SPOTIFY);
    if (!player) {
        return
    }
    
    const colors = await getColorsInHex(styles.background.color, styles.text.color, player.trackImageUri);
    return {
        player,
        styles: colors 
    };
}

export async function getExpectedPlayerUpdate(playerCard: PlayerCardType) {
    const progress = playerCard.player.progress;
    const millis = progress.millis + RE_RENDER_INTERVAL_MILLIS;
    const colors = await getColorsInHex(playerCard.styles.bg.color, playerCard.styles.txt.color, playerCard.player.trackImageUri);
    const newPlayer = structuredClone(playerCard.player);
    newPlayer.progress = getFormattedDuration(millis);
    
    return {
        player: newPlayer,
        styles: colors
    }
}

export function getStyles(props: Props, queryParams: ReadonlyURLSearchParams) {
    const bgType = props.bgType || queryParams.get("bg") || DEFAULTS.BG_TYPE;
    const bgColor =  (bgType === "solid") ? 
        (props.bgColor || queryParams.get("bgcolor") || DEFAULTS.BG_COLOR) : 
        DEFAULTS.BG_COLOR;
    const textColor = props.txtColor || queryParams.get("txtcolor") || DEFAULTS.TXT_COLOR;
    const opacity = props.opacity ?? parseInt(queryParams.get("opacity") ?? DEFAULTS.OPACITY);

    return {
        background : {
            type: bgType,
            color: getHexWithOpacity(bgColor, opacity)
        },
        text: {
            color: textColor 
        }
    };
}

export async function getColorsInHex(bgColor: string, txtColor: string, imageUri: string) {  
    if (!isDynamicColor(txtColor) && !isDynamicColor(bgColor)) {
        return {
            bg: {
                color: bgColor
            },
            txt: {
                color: txtColor
            }
        }
    }
    
    const pallete = await Vibrant.from(imageUri).getPalette();
    const bgColorHex = isDynamicColor(bgColor) ? (pallete[bgColor]?.hex ?? '') : bgColor;
    const txtColorHex = isDynamicColor(txtColor) ? ( pallete[txtColor]?.hex ?? '' ) : txtColor;
    return {
        bg: {
            color: bgColorHex
        },
        txt: {
            color: txtColorHex
        }
    };
}
