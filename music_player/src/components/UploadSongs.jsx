// src/components/UploadSongs.js
import React, { useState } from "react";
import { storage, db } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import "../styles.css";

const UploadSongs = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const storageRef = ref(storage, `songs/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "songs"), {
      name: file.name,
      url: url,
    });

    setFile(null);
    onUpload();
  };

  return (
    <div className="upload-songs-container">
      <input type="file" onChange={handleFileChange} />
      <button className="upload-button" onClick={handleUpload}>
        Upload songs
      </button>
    </div>
  );
};

export default UploadSongs;
