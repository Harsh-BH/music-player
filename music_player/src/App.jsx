// src/App.js
import React, { useState } from "react";
import UploadSongs from "./components/UploadSongs";
import MusicPlayer from "./components/MusicPlayer";
import "./styles.css";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleUpload = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="app-container">
      <MusicPlayer key={refresh} />
      <UploadSongs onUpload={handleUpload} />
    </div>
  );
};

export default App;
