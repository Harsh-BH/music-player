// src/components/MusicPlayer.js
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const fetchSongs = async () => {
    const querySnapshot = await getDocs(collection(db, "songs"));
    const songsList = querySnapshot.docs.map((doc) => doc.data());
    setSongs(songsList);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const playSong = (url) => {
    setCurrentSong(url);
  };

  return (
    <div className="music-player-container">
      <div className="song-list">
        {songs.map((song, index) => (
          <div className="song" key={index} onClick={() => playSong(song.url)}>
            {song.name}
          </div>
        ))}
      </div>
      <div className="player-controls">
        {currentSong && <audio controls src={currentSong} />}
        <div className="progress-bar"></div>
        <div className="controls">
          <button className="control-button">Back</button>
          <button className="control-button">Play</button>
          <button className="control-button">Next</button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
