import "./StartScreen.css"
import pokemonHeader from "./../../assets/images/pokemon_header.png";
import { CurrentPage } from "../../global";

export function StartScreen({ setPage }){
    return(
        <div 
            id="start_screen" 
            onClick={() => {setPage(CurrentPage.REGION_SCREEN)}}
            >
            <div id="pokemonHeaderDiv">
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