import "./Components.css"
import pokeballImg from "../../assets/images/pokeball.png"

export function Button({ text="Start Game", onClick, "data-testid": testId }) {
    return (
        <button className="btn-grad" onClick={onClick} data-testid={testId ?? "button"}>
            {text}
            <img src={pokeballImg} className="btn-img"/>
        </button>
    )
}