import "./RegionScreen.css"
import { StartButton } from "../Components/StartButton";
import Region from "../Components/Region";
import { regions } from "../../global";

export function RegionScreen() {
    return (
        <div id="region_screen">
            <h1>Pick your regions</h1>
            <div id="regions">

                {Object.keys(regions).map((regionName) => (
                    <Region key={regionName} regionName={regionName} regionImage={regions[regionName]} />
                ))}
            </div>
            <div>
                <StartButton />
            </div>
        </div>
    );
}