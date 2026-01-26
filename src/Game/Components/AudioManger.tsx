import { useRef, useEffect, useState } from "react";
import "./Components.css";
import { useAudio } from "./../context/AudioPlayerContext";

export function Audio() {
  const { isPlaying, toggle } = useAudio();

  const handleToggle = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    toggle();
  };

  return (
    <div id="audio-element">
      {isPlaying ? pauseAudio(handleToggle) : playAudio(handleToggle)}
    </div>
  );
}

export function pauseAudio(onClick: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void) {
    return (
        <svg className="button" viewBox="0 0 60 60" onClick={onClick}>
            <rect x="0" y="0" width="20" height="60" />
            <rect x="30" y="0" width="20" height="60" />
        </svg>
    );
}

export function playAudio(onClick: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void) {
    return (
        <svg className="button" viewBox="0 0 60 60" onClick={onClick}>
            <polygon points="0,0 50,30 0,60" />
        </svg>
    );
}