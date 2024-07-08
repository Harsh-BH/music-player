import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./Home.css";

function Home() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const querySnapshot = await getDocs(collection(db, "musicFiles"));
      const songsList = querySnapshot.docs.map((doc) => doc.data());
      setSongs(songsList);
    };

    fetchSongs();
  }, []);

  return (
    <div className="home">
      <h2>Uploaded Songs</h2>
      <div className="song-list">
        {songs.map((song, index) => (
          <div key={index} className="song-item">
            <p>{song.name}</p>
            <audio controls src={song.url}></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
