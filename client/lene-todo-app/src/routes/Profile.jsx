import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../features/auth/authSlice';
import { addHeaderImage, addProfileImage } from '../features/auth/authSlice';
import IconContainer from '../components/IconContainer';

const Profile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const fileInputRef = useRef();
  const headerInputRef = useRef();
  const stateProfile = useSelector(state => state.auth);

  const [editMode, setEditMode] = useState(false);
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleProfileUpload = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      alert("Vennligst velg en fil!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {

      const response = await axios.post('http://localhost:5000/uploads/profileImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      });

      console.log("Respons fra server: ", response.data);
      dispatch(addProfileImage(response.data.url))
      toast.success("Profilbilde lastet opp! ✌️", {
        position: "bottom-left",
        autoClose: 3000,
      });

    } catch (error) {

      console.error('Feil ved opplasting av bilde: ', error);
      toast.error("Feil ved opplasting! 👀", {
        position: "bottom-left",
        autoClose: 3000,
      });

    } finally {
      setUploading(false);
      fileInputRef.current.value = "";
    }
  }

  const handleHeaderUpload = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      alert("Vennligst velg en fil!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {

      const response = await axios.post('http://localhost:5000/uploads/headerImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      });

      console.log("Respons fra server: ", response.data);
      dispatch(addHeaderImage(response.data.url))
      toast.success("Header bilde lastet opp! ✌️", {
        position: "bottom-left",
        autoClose: 3000,
      });

    } catch (error) {

      console.error('Feil ved opplasting av bilde: ', error);
      toast.error("Feil ved opplasting! 👀", {
        position: "bottom-left",
        autoClose: 3000,
      });

    } finally {
      setUploading(false);
      fileInputRef.current.value = "";
    }
  }

  const handleProfileImgClick = () => {
    fileInputRef.current.click();
  }

  const handleHeaderImgClick = () => {
    headerInputRef.current.click();
  }

/*   const fetchProfile = async () => {
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
    
  },[token]) */

  const handleSave = async () => {
    setEditMode(false);
    setDeletePrompt(false);

    if (stateProfile.username !== newUsername || stateProfile.email !== newEmail) {

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

/*       fetchProfile(); */
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
    setNewUsername(stateProfile.username);
    setNewEmail(stateProfile.email);
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
        localStorage.removeItem("token");

      } catch(error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      
    <div className='todo-profile-container' >

    {stateProfile && stateProfile.profileHeaderUrl ?
      <img onClick={handleHeaderImgClick} className='header-image' src={stateProfile.profileHeaderUrl} />
      :
      <div onClick={handleHeaderImgClick} className='header-placeholder'></div>
    }

    {stateProfile && stateProfile.profileImageUrl ?
      <img onClick={handleProfileImgClick} className='profile-image' src={stateProfile.profileImageUrl} />
      :
      <div onClick={handleProfileImgClick} className='profile-placeholder'></div>
    }

      <div className="white-circle-cutout"></div>

      <input style={{ display: "none" }} ref={fileInputRef} type="file" onChange={handleProfileUpload} accept='image/*' />
      <input style={{ display: "none" }} ref={headerInputRef} type="file" onChange={handleHeaderUpload} accept='image/*' />
    
    <div className='profile-tools-container'>
      <IconContainer onClick={() => console.log("hello")} iconName={"wired-outline-185-trash-bin"} reveal={"in-reveal"} hover={"hover-empty"} size={40} />
      <IconContainer onClick={() => console.log("hello")} iconName={"wired-outline-35-edit"} reveal={"in-reveal"} hover={"hover-circle"} size={40} />
    </div>


    </div>

    </>
  )
}

export default Profile