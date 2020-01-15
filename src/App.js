import React, { useState } from "react";
import "./App.css";
import CanvasComponent from "./components/fbcanvas/CanvasComponent";

function App() {
  const [zoom, setZoom] = useState(1);
  const [reset, setReset] = useState(true);

  const handleReset = () => {
    setReset(!reset);
    setZoom(1);
  };

  return (
    <div className="App">
      <CanvasComponent resetZoom={() => setZoom(1)} zoom={zoom} reset={reset} />

      <div className="zoom-bar">
        <button className="zoom-btn plus" onClick={() => setZoom(zoom + 0.05)}>
          +
        </button>
        <p>{Math.floor(Math.ceil(zoom * 100), 2)}</p>
        <button className="zoom-btn minus" onClick={() => setZoom(zoom - 0.05)}>
          -
        </button>
        <button className="zoom-btn focus-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
