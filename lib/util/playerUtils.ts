import { Duration } from "@/types/player.types";

export function getFormattedDuration(millis: number): Duration {
    const mins = Math.trunc(millis/60000);
    const secs = Math.trunc(millis/1000) - mins*60;
    
    const minsStr = mins.toString();
    const secsStr = secs < 10 ? "0".concat(secs.toString()) : secs.toString();

    return {display: {mins: minsStr, secs: secsStr}, millis};
}