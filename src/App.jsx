import { useState, useEffect } from "react";

import "./App.css";
import { Maxwell } from "./assets/Maxwell_dance";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PositionalAudio,
  PresentationControls,
} from "@react-three/drei";

function App({ ready }) {
  const [audio] = useState(new Audio("/maxwell.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.loop = true;
      audio.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    };
  }, [audio]);
  return (
    <div className="w-full h-screen">
      <div>
        <h1>Maxwell</h1>
        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
      <Canvas>
        <PresentationControls zoom={2}>
          <ambientLight />
          <OrbitControls autoRotate={true} autoRotateSpeed={20} />
          <Maxwell ready={ready} />
        </PresentationControls>
      </Canvas>
    </div>
  );
}

export default App;
