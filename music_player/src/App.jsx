import React from "react";
import Home from "./components/Home";
import MusicPlayer from "./components/MusicPlayer";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Music Player</h1>
      <div className="main-content">
        <Home />
        <MusicPlayer />
      </div>
    </div>
  );
}

export default App;
