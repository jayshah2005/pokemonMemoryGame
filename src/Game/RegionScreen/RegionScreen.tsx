import "./RegionScreen.css"
import { StartButton } from "../Components/StartButton";
import Region from "../Components/Region";
import { regions } from "../../global";

export function RegionScreen({ setSelectedRegions }) {
    return (
        <div id="region_screen" className="fade-in"> 
            <h1>Pick your regions</h1>
            <div id="regions">

                {Object.keys(regions).map((key) => (
                    <Region key={key} regionName={key} regionInfo={regions[key]} setSelectedRegion={setSelectedRegions}/>
                ))}
            </div>
            <div>
                <StartButton />
            </div>
        </div>
    );
}