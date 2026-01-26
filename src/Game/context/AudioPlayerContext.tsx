import React, { createContext, useContext, useRef, useState, useEffect } from "react";

type AudioContextType = {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  toggle: () => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({
  backgroundSound,
  children,
}: {
  backgroundSound: string;
  children: React.ReactNode;
}) {
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        console.log("Autoplay prevented");
      });
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <AudioContext.Provider value={{ audioRef, isPlaying, toggle }}>
      <audio ref={audioRef} src={backgroundSound} loop />
      {children}
    </AudioContext.Provider>  
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
}
