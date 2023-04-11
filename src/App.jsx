import { useState, useEffect } from "react";

import "./App.css";
import { Maxwell } from "./assets/Maxwell_dance";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PositionalAudio,
  PresentationControls,
} from "@react-three/drei";
import { Doggy } from "./assets/Doggy";

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
    <div className=" h-screen">
      <h1 className="text-2xl font sm:text-9xl text-center text-white">
        Maxwell
      </h1>
      <div className="justify-center flex">
        <button
          className="bg-slate-400 active:bg-blue-600 text-white m-0 rounded-xl w-screen h-screen"
          onClick={handlePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}

          <Canvas>
            <PresentationControls zoom={2}>
              <ambientLight />
              <OrbitControls autoRotate={true} autoRotateSpeed={20} />
              <Maxwell ready={ready} />
            </PresentationControls>
            <Doggy position={[1, -1, -5]} />
          </Canvas>
        </button>
      </div>
    </div>
  );
}

export default App;
