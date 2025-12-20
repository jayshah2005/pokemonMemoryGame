export default function Region({regionName, regionImage, setRegion}: {regionName: string, regionImage: string, setRegion: (regionName: string) => void}) {
    return (
        <div className="region-block" onClick={handleClick}>
            <img src={regionImage} alt={regionName} />
            <p>{regionName} Region</p>
        </div>
    )

    function handleClick() {

    }
}