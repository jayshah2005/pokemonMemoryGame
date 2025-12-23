import { CurrentPage } from "../../global";
import { Button } from "../Components/Button";
import { GameStaus } from "../../global";

export function WinModel({setPage, setGameStatus}) {
    return (
        <div id="win_model" className="box">
            <div id="win_content">
                <h1>Congratulations! You Won!</h1>
                <p>You have successfully completed the game.</p>
                <Button text="Play Again" onClick={handleClick} />
            </div>
        </div>
    );

    function handleClick() {
        setPage(CurrentPage.START_SCREEN);
        setGameStatus(GameStaus.NOT_DETERMINED);
    }
}