import "./RegionScreen.css"
import { Button } from "../Components/Button";
import Region from "../Components/Region";
import { CurrentPage, regions } from "../../global";

export function RegionScreen({ setPage, setSelectedRegions }) {

    function handleRegionSelect(e: React.MouseEvent<HTMLButtonElement>) {

        const parent = e.currentTarget.parentElement?.parentElement;
        if (!parent) return;
        parent.classList.add("fade-out");

        setTimeout(() => {
            setPage(CurrentPage.GAME_SCREEN)
        }, 200);
    }

    return (
        <div id="region_screen" className="fade-in"> 
            <h1>Pick your regions</h1>
            <div id="regions">

                {Object.keys(regions).map((key) => (
                    <Region key={key} regionName={key} regionInfo={regions[key]} setSelectedRegion={setSelectedRegions}/>
                ))}
            </div>
            <div>
                <Button onClick={handleRegionSelect} text="Start Game" />
            </div>
        </div>
    );
}