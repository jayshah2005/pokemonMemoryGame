import { useRef, useEffect, useState } from "react";
import "./Components.css"

export function Audio({backgroundSound}) {

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);


    // Try to play audio when component mounts
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch((error) => {
                // Autoplay was prevented - will start on first user interaction
                console.log("Autoplay prevented - waiting for user interaction");
            });
        }
    }, [audioRef]);

    // Start audio on first user interaction (click anywhere)
    useEffect(() => {
        if (!isPlaying) {
            const handleUserInteraction = () => {
                if (audioRef.current) {
                    audioRef.current.play().then(() => {
                        setIsPlaying(true);
                    }).catch((error) => {
                        console.log("Audio play failed:", error);
                    });
                }
                document.removeEventListener('click', handleUserInteraction);
            };
            document.addEventListener('click', handleUserInteraction);
            
            return () => {
                document.removeEventListener('click', handleUserInteraction);
            };
        }
    }, [isPlaying, audioRef]);

    const handleToggle = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    return (
        <div id="audio-element">
            <audio ref={audioRef} src={backgroundSound} loop></audio>
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