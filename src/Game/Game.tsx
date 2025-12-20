import { useState } from "react";
import { CurrentPage } from "../global";
import { StartScreen } from "./StartScreen/StartScreen";
import { RegionScreen } from "./RegionScreen/RegionScreen";

export function Game(){

    let [currentPage, setPage] = useState(CurrentPage.START_SCREEN);

    return (
        <>
            <div id="Game">
                {currentPage === CurrentPage.START_SCREEN && <StartScreen setPage={setPage}></StartScreen>}
                {currentPage === CurrentPage.REGION_SCREEN && <RegionScreen></RegionScreen>}
            </div>
        </>
    )
}