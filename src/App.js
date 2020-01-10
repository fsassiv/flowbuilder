import React, { useState } from "react";
import "./App.css";
import CanvasComponent from "./components/fbcanvas/CanvasComponent";

function App() {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="App">
      <CanvasComponent zoom={zoom} />

      <div className="zoom-bar">
        <button className="zoom-btn plus" onClick={() => setZoom(zoom + 0.05)}>
          +
        </button>
        <p>{Math.floor(Math.ceil(zoom * 100), 2)}</p>
        <button className="zoom-btn minus" onClick={() => setZoom(zoom - 0.05)}>
          -
        </button>
      </div>
    </div>
  );
}

export default App;
