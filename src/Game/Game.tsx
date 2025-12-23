import { useState } from "react";
import { CurrentPage, GameStaus } from "../global";
import { StartScreen } from "./StartScreen/StartScreen";
import { RegionScreen } from "./RegionScreen/RegionScreen";
import { GameScreen } from "./GameScreen/GameScreen.tsx";
import { WinModel } from "./Model/WinModel.tsx";
import { LoseModel } from "./Model/LoseModel.tsx";

export function Game(){

    let [page, setPage] = useState(CurrentPage.START_SCREEN);
    let [selectedRegions, setSelectedRegions] = useState([])
    let [gameStatus, setGameStatus] = useState(GameStaus.NOT_DETERMINED);

    return (
        <>
            <div id="Game">
                {page === CurrentPage.START_SCREEN && <StartScreen setPage={setPage}></StartScreen>}
                {page === CurrentPage.REGION_SCREEN && <RegionScreen setPage={setPage} setSelectedRegions={setSelectedRegions}></RegionScreen>}
                {page === CurrentPage.GAME_SCREEN && <GameScreen selectedRegions={selectedRegions} gameStatus={gameStatus} setGameStatus={setGameStatus}></GameScreen>}

                {gameStatus === GameStaus.WON && <WinModel setPage={setPage} setGameStatus={setGameStatus} />}
                {gameStatus === GameStaus.LOST && <LoseModel setPage={setPage} setGameStatus={setGameStatus} />}
            </div>
        </>
    )
}