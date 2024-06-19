import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../features/auth/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("userToken");
  const fileInputRef = useRef();

  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailUrl(reader.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  }

  const handleUpload = async () => {

    if (!file) {
      alert("Vennligst velg en fil!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {

      const response = await axios.post('http://localhost:5000/uploads/profileImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      });

      setUploadMessage(response.data.message);
      console.log("Respons fra server: ", response.data);

    } catch (error) {

      console.error('Feil ved opplasting av bilde: ', error);
      setUploadMessage('Det oppstod en feil under opplastingen..')

    } finally {

      setUploading(false);
      setFile(null);
      setThumbnailUrl(null);
      fileInputRef.current.value = "";

    }
  }

  const fetchProfile = async () => {
    try {
      if (token) {
        console.log("Token inside profile: ", token);
        const response = await axios.get('http://localhost:5000/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProfileData(response.data);
        console.log('Dette er info som kom tilbake fra API: ', response)
      }
    } catch(error) {
      console.log("Error fetching profile: ", error);
    }
  }

  useEffect(() => {
  fetchProfile();
    
  },[token])

  const handleSave = async () => {
    setEditMode(false);
    setDeletePrompt(false);

    if (profileData.username !== newUsername || profileData.email !== newEmail) {

      try {
        const response = await axios.put(
          "http://localhost:5000/users/edit", 
          {
          username: newUsername,
          email: newEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data);

      fetchProfile();
      toast.success(response.data.message, {
        position: "bottom-left",
        autoClose: 3000,
      });

      
      } catch (error) {
        console.log("Her er feilmeldingen etter axios profil: ", error);
        toast.error(error.response.data, {
          position: "bottom-left",
          autoClose: 3000,
        });
      }
    }
  }

  const handleEdit = () => {
    setEditMode(true);
    setNewUsername(profileData.username);
    setNewEmail(profileData.email);
  }

  const handleDeleteProfile = async() => {

    if (token) {
      try { 
        const response = await axios.delete("http://localhost:5000/users/delete",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        
        console.log("Delete response: ", response);
        console.log("Brukernavnet er her: ", response.data.username);
        dispatch(logout());
        toast.success(`Slettet bruker: ${response.data.username}`, {
          position: "bottom-left",
          autoClose: 3000,
        });
        localStorage.removeItem("userToken");

      } catch(error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      
    <div className='todo-profile-container'>
      {profileData &&
      <img className='profile-image' src={profileData.profileImage} />
      }
    </div>
      



    <div className="profile-picture-container">
      <input ref={fileInputRef} type="file" onChange={handleFileChange} accept='image/*' />
      <button onClick={handleUpload} disabled={uploading} >Upload</button>
      {thumbnailUrl && (
        <img src={thumbnailUrl} alt="Thumbnail" style={{ maxWidth: "200px", maxHeight: "200px" }} />
      )}
      {file && <p>Filename: {file.name}</p>}
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>

    </>
  )
}

export default Profile