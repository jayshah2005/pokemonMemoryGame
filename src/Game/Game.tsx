import { StartScreen } from "./StartScreen/StartScreen";

export function Game(){

    let session = false;

    return (
        <>
            <div id="Game">
                <StartScreen></StartScreen>
            </div>
        </>
    )
}