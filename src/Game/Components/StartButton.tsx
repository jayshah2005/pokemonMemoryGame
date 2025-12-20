import "./StartButton.css"
import pokeballImg from "../../assets/images/pokeball.png"

export function StartButton() {
    return (
        <button className="btn-grad">
            Start Game
            <img src={pokeballImg} className="btn-img"/>
        </button>
    )
}