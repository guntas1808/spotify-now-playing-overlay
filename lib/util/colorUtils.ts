export const DYNAMIC_COLORS = [
    "Vibrant",
    "LightVibrant",
    "DarkVibrant",
    "Muted",
    "LightMuted",
    "DarkMuted"
];

export function isDynamicColor(color: string) {
    return DYNAMIC_COLORS.includes(color);
}

export function getHexWithOpacity(color: string, opacity: number) {
    if (isDynamicColor(color)) {
        return color;
    }
    return color + ((opacity*255)/100).toString(16);
}