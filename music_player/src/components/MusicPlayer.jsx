import React, { useState, useRef, useEffect } from "react";
import { storage, db } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import "./MusicPlayer.css";

function MusicPlayer() {
  const [audioUrl, setAudioUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const audioRef = useRef();

  useEffect(() => {
    const fetchSongs = async () => {
      const querySnapshot = await getDocs(collection(db, "musicFiles"));
      const songsList = querySnapshot.docs.map((doc) => doc.data());
      setSongs(songsList);
      if (songsList.length > 0) {
        setAudioUrl(songsList[0].url);
      }
    };

    fetchSongs();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const storageRef = ref(storage, `music/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await addDoc(collection(db, "musicFiles"), {
        name: file.name,
        url: url,
      });
      setSongs([...songs, { name: file.name, url: url }]);
      setFile(null);
    }
  };

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setAudioUrl(songs[nextIndex].url);
    setIsPlaying(false);
  };

  const prevSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setAudioUrl(songs[prevIndex].url);
    setIsPlaying(false);
  };

  const handleVolumeChange = (e) => {
    const volumeValue = e.target.value;
    setVolume(volumeValue);
    audioRef.current.volume = volumeValue;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", nextSong);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", nextSong);
      }
    };
  }, [audioRef, nextSong]);

  return (
    <div className="music-player">
      <h2>Upload a New Song</h2>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div className="player-controls">
        {audioUrl && (
          <div>
            <p>{songs[currentSongIndex]?.name}</p>
            <audio ref={audioRef} src={audioUrl} controls hidden></audio>
            <button onClick={prevSong}>Previous</button>
            <button onClick={playPause}>{isPlaying ? "Pause" : "Play"}</button>
            <button onClick={nextSong}>Next</button>
            <div className="volume-control">
              <label htmlFor="volume">Volume</label>
              <input
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MusicPlayer;
