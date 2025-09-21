'use client';

import { useSearchParams } from 'next/navigation';
import { RefObject, useEffect, useReducer, useRef } from 'react';
import PlayingAnimation from '../_playingAnimation/PlayingAnimation';
import { getActualPlayerUpdate, getExpectedPlayerUpdate, getStyles } from './helper';
import { PlayerCardType, Props, Styles } from './player-card.types';
import { API_CALL_INTERVAL_MILLIS, PLAYER_CARD_ID, RE_RENDER_INTERVAL_MILLIS } from './constants';

const updatePlayer = (t: number, styles: Styles, playerCard: RefObject<PlayerCardType | undefined>) => {
    const divisor = Math.trunc(API_CALL_INTERVAL_MILLIS/RE_RENDER_INTERVAL_MILLIS);
    if (t%divisor === 0) {
        getActualPlayerUpdate(styles).then(newPlayerCard => {
            if (!newPlayerCard) {
                playerCard.current = undefined;
                return
            }
            
            if (playerCard.current && Object.keys(playerCard.current).length !== 0 && !newPlayerCard.player.isPlaying && playerCard.current.player?.isPlaying) {
                const playerContainer = document.getElementById(PLAYER_CARD_ID);
                playerContainer?.classList.remove('animate__fadeIn');
                playerContainer?.classList.add('animate__fadeOut');
                setTimeout(() => playerCard.current = newPlayerCard, 500);
            } else if (!playerCard.current || newPlayerCard.player.isPlaying || playerCard.current.player.isPlaying) {
                playerCard.current  = newPlayerCard;
            }
        });
        return;
    } else if (playerCard.current && playerCard.current.player.isPlaying) {
        getExpectedPlayerUpdate(playerCard.current).then(newPlayerCard => playerCard.current  = newPlayerCard);
    }
}

const PlayerCard = (props: Props) => {
    const queryParams = useSearchParams();
    const width = props.width ?? queryParams.get('width') ?? '1800';
    const scalingFactor = parseInt(width)/1800;
    const styles = getStyles(props, queryParams);
    
    const playerCard = useRef<PlayerCardType | undefined>(undefined);
    const [t, dispatch] = useReducer(t => t + 1, 0);

    useEffect(() => updatePlayer(t, styles, playerCard), [t])
    setTimeout(dispatch, RE_RENDER_INTERVAL_MILLIS)
    
    if (!playerCard.current || !playerCard.current.player.isPlaying) {
        return (
            <div className='skeleton m-auto' 
                style={{
                    width: `${1800*scalingFactor}px`,
                    height: `${320*scalingFactor}px`,
                }}>
            </div>
        );
    }

    return <>
        <div className='animate__animated animate__fadeIn m-auto'
            style={{
                width: `${1800*scalingFactor}px`,
                height: `${320*scalingFactor}px`,
        }}>
            <div id={PLAYER_CARD_ID} className={`card opacity-100 card-side rounded-xl text-[#dadade] font-(family-name:--font-geist-sans) ${styles.background.type === 'glass' ? 'glass' : ''}`}
                style = {(() => {
                    const fixedStyles = {
                        width: '1800px',
                        height: '320px',
                        transform: `scale(${scalingFactor})`,
                        transformOrigin: 'top left',
                        color: playerCard.current.styles.txt.color,
                    }
                    if (styles.background.type === 'solid') {
                        return {...fixedStyles, backgroundColor: playerCard.current.styles.bg.color }
                    } else if (styles.background.type === 'transparent') {
                        return  {...fixedStyles, backgroundColor: 'transparent'};
                    }
                    return fixedStyles
                })()}
                >
                <figure className='p-6 pr-0 relative'>
                    {playerCard.current.player.trackImageUri &&
                        <img id='player-card-image' className=' shadow-lg shadow-base-300 rounded-xl max-w-80 max-h-80'
                            src={playerCard.current.player.trackImageUri} 
                            alt=''/>
                    }
                    <PlayingAnimation color={playerCard.current.styles.txt.color}/>
                </figure>
                <div className='card-body m-auto ml-5'>
                    <div className='pb-8'>
                        <div className='text-7xl tracking-normal pb-4'>
                            {playerCard.current.player.trackName.trim()}
                        </div>
                        <span className='text-5xl'>
                            {playerCard.current.player.artistNames.join(', ')}
                        </span>
                    </div>
                    <div className='progress-bar flex'>
                        <div className='text-4xl'>
                            {playerCard.current.player.progress.display.mins}:{playerCard.current.player.progress.display.secs}
                        </div>
                        <progress className='progress my-auto mx-3 rounded-xl h-[14px]' 
                                value={playerCard.current.player.progress.millis} 
                                max={playerCard.current.player.duration.millis}
                                style={{
                                    color: playerCard.current.styles.txt.color,
                                    backgroundColor: `color-mix(in srgb, ${playerCard.current.styles.txt.color} 20%, transparent)`
                                }}/>
                        <div className='text-4xl'>
                            {playerCard.current.player.duration.display.mins}:{playerCard.current.player.duration.display.secs}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default PlayerCard;