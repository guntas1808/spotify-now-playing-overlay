import { Player } from "@/types/player.types";

export type Styles = {
    background: {
        type: string,
        color: string 
    },
    text: {
        color: string
    }
};
export type Props = {
    width?: string,
    bgType?: string,
    bgColor?: string,
    txtColor?: string,
    opacity?: number
}
export type PlayerCardType = {
    player: Player,
    styles: {
        bg: {
            color: string
        },
        txt: {
            color: string
        }
    }
};
