import "./Components.css"
import pokeballImg from "../../assets/images/pokeball.png"

export function StartButton({ onClick }) {
    return (
        <button className="btn-grad" onClick={onClick}>
            Start Game
            <img src={pokeballImg} className="btn-img"/>
        </button>
    )
}