import "./StartScreen.css"
import pokemonHeader from "./../../assets/images/pokemon_header.png";

export function StartScreen(){
    return(
        <div id="start_screen">
            <div id="img">
                <img src={pokemonHeader} alt="" />
            </div>
            <div id="start_instructions">
                <p>Welcome to the Pokémon Memory Game!</p>
                <p>Test your memory skills by cataching 'em all without any repetition!</p>
                <p>Good luck and have fun!</p>

                <h2 className="blinking-text">Click to continue</h2>
            </div>
        </div>
    )
}