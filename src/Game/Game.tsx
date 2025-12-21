import { useState } from "react";
import { CurrentPage } from "../global";
import { StartScreen } from "./StartScreen/StartScreen";
import { RegionScreen } from "./RegionScreen/RegionScreen";
import { GameScreen } from "./GameScreen/GameScreen.tsx";

export function Game(){

    let [currentPage, setPage] = useState(CurrentPage.REGION_SCREEN);
    let [selectedRegions, setSelectedRegions] = useState([])

    if (currentPage === CurrentPage.GAME_SCREEN) {
        // Game screen logic would go here
    }

    return (
        <>
            <div id="Game">
                {currentPage === CurrentPage.START_SCREEN && <StartScreen setPage={setPage}></StartScreen>}
                {currentPage === CurrentPage.REGION_SCREEN && <RegionScreen setPage={setPage} setSelectedRegions={setSelectedRegions}></RegionScreen>}
                {currentPage === CurrentPage.GAME_SCREEN && <GameScreen selectedRegions={selectedRegions}></GameScreen>}
            </div>
        </>
    )
}