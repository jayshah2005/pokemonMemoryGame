export default function Region({
  regionName,
  regionInfo,
  setSelectedRegion
}){


  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;

    // Toggle visual state
    el.classList.toggle("checkmark");

    const isSelected = el.classList.contains("checkmark");

    setSelectedRegion((prev) => {
      if (isSelected) {
        return prev.includes(regionInfo.id)
          ? prev
          : [...prev, regionInfo.id];
      } else {
        return prev.filter(id => id !== regionInfo.id);
      }
    });
  }

  return (
    <div className="region-block" onClick={handleClick}>
      <img src={regionInfo.map} alt={regionName} />
      <p>{regionName} Region</p>
    </div>
  );
}
