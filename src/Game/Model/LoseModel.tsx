import { Button } from "../Components/Button";
import { CurrentPage, GameStaus } from "../../global";

export function LoseModel({setPage, setGameStatus}) {
    return (
        <div id="lose_model" className="box">
            <div id="lose_content">
                <h1>Game Over! You Lost!</h1>
                <p>Better luck next time.</p>
                <Button text="Try Again" onClick={handleClick} />
            </div>
        </div>
    );

    function handleClick() {
        setPage(CurrentPage.START_SCREEN);
        setGameStatus(GameStaus.NOT_DETERMINED);
    }
}
