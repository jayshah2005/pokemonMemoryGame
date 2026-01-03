import { useRef, useState, useEffect } from "react";
import { CurrentPage, GameStaus } from "../global";
import { StartScreen } from "./StartScreen/StartScreen";
import { RegionScreen } from "./RegionScreen/RegionScreen";
import { GameScreen } from "./GameScreen/GameScreen.tsx";
import { WinModel } from "./Model/WinModel.tsx";
import { LoseModel } from "./Model/LoseModel.tsx";
import backgroundSound from "./../assets/sounds/themeOfPalletTown.mp3"

export function Game(){

    let [page, setPage] = useState(CurrentPage.START_SCREEN);
    let [selectedRegions, setSelectedRegions] = useState([])
    let [gameStatus, setGameStatus] = useState(GameStaus.NOT_DETERMINED);

    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioStarted, setAudioStarted] = useState(false);

    // Function to start audio (called on user interaction)
    const startAudio = () => {
        if (audioRef.current && !audioStarted) {
            audioRef.current.play().then(() => {
                setAudioStarted(true);
            }).catch((error) => {
                console.log("Audio play failed:", error);
            });
        }
    };

    // Try to play audio when component mounts
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play().then(() => {
                setAudioStarted(true);
            }).catch((error) => {
                // Autoplay was prevented - will start on first user interaction
                console.log("Autoplay prevented - waiting for user interaction");
            });
        }
    }, []);

    // Start audio on first user interaction (click anywhere)
    useEffect(() => {
        if (!audioStarted) {
            const handleUserInteraction = () => {
                startAudio();
                // Remove listeners after first interaction
                document.removeEventListener('click', handleUserInteraction);
                document.removeEventListener('touchstart', handleUserInteraction);
            };
            
            document.addEventListener('click', handleUserInteraction);
            document.addEventListener('touchstart', handleUserInteraction);
            
            return () => {
                document.removeEventListener('click', handleUserInteraction);
                document.removeEventListener('touchstart', handleUserInteraction);
            };
        }
    }, [audioStarted]);

    return (
        <>
            <div id="Game" onClick={startAudio}>
                <audio 
                    ref={audioRef}
                    src={backgroundSound} 
                    loop={true}
                />
                {page === CurrentPage.START_SCREEN && <StartScreen setPage={setPage}></StartScreen>}
                {page === CurrentPage.REGION_SCREEN && <RegionScreen setPage={setPage} setSelectedRegions={setSelectedRegions}></RegionScreen>}
                {page === CurrentPage.GAME_SCREEN && <GameScreen selectedRegions={selectedRegions} gameStatus={gameStatus} setGameStatus={setGameStatus}></GameScreen>}

                {gameStatus === GameStaus.WON && <WinModel setPage={setPage} setGameStatus={setGameStatus} />}
                {gameStatus === GameStaus.LOST && <LoseModel setPage={setPage} setGameStatus={setGameStatus} />}
            </div>
        </>
    )
}