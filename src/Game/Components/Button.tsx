import "./Components.css"
import pokeballImg from "../../assets/images/pokeball.png"

export function Button({ text="Start Game", onClick }) {
    return (
        <button className="btn-grad" onClick={onClick}>
            {text}
            <img src={pokeballImg} className="btn-img"/>
        </button>
    )
}