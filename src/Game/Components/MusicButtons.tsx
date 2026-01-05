export function toggleAudio(audioRef: React.RefObject<HTMLAudioElement>) {

    const handleToggle = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        if (audioRef.current) {
            if (audioRef.current.paused) {
                playAudio(audioRef);
            } else {
                pauseAudio(audioRef);
            }
        }
    }
}

export function pauseAudio(audioRef: React.RefObject<HTMLAudioElement>) {
    return (
        <svg className="button" viewBox="0 0 60 60" onClick={(e) => handlePause(e, audioRef)}>
            <rect x="0" y="0" width="20" height="60" />
            <rect x="30" y="0" width="20" height="60" />
        </svg>
    );
}

export function playAudio(audioRef: React.RefObject<HTMLAudioElement>) {
    return (
        <svg className="button" viewBox="0 0 60 60" onClick={(e) => handlePlay(e, audioRef)}>
            <polygon points="0,0 50,30 0,60" />
        </svg>
    );
}

export function handlePause(e: React.MouseEvent<SVGSVGElement, MouseEvent>, audioRef: React.RefObject<HTMLAudioElement>) {
        e.stopPropagation();
        if (audioRef.current) {
            audioRef.current.pause();
        }
};

export function handlePlay(e: React.MouseEvent<SVGSVGElement, MouseEvent>, audioRef: React.RefObject<HTMLAudioElement>) {
        e.stopPropagation();
        if (audioRef.current) {
            audioRef.current.play();
        }
}