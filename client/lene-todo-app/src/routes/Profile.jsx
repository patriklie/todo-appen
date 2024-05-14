import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {

  const [profileData, setProfileData] = useState(null);
  const token = localStorage.getItem("userToken");
  const [editMode, setEditMode] = useState(false);
  const [deletePrompt, setDeletePrompt] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");

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

  const handleDeleteProfile = () => {
    alert("Sletter bruker!");
    if (token) {
      try {

      } catch(error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      { !editMode ? 
      (
        <div className="container profile">
          <div className="profile-container">
            <span className="material-symbols-outlined profile-icon">account_circle</span>
            <div className="profile-data-container">
              <div>
                <div><span className='bold-text'>Username: </span><span style={{ cursor: "pointer" }} onClick={handleEdit} >{ profileData && profileData.username }</span></div>
                <div><span className='bold-text'>Email: </span><span style={{ cursor: "pointer" }} onClick={handleEdit}>{ profileData && profileData.email }</span></div>
              </div>
              <div>
                <span onClick={handleEdit} className="profile-icons material-symbols-outlined edit-profile">edit</span>
              </div>
            </div>
          </div>
        </div>
      )
        :
      (
        <div className={`container profile ${editMode ? 'expanded' : ''}`}>
          <form className="form-edit-profile">
            <span className="material-symbols-outlined profile-icon">account_circle</span>
            <div className="profile-data-container">
              <div>
                <div>
                  <label htmlFor='editUsername' className='bold-text'>Username: </label>
                  <input onKeyDown={(e) => e.key === "Enter" ? handleSave() : ""} onChange={(e) => setNewUsername(e.target.value)} id="editUsername" type="text" value={newUsername}/>
                </div>
                <div>
                <label htmlFor='editEmail' className='bold-text'>Email: </label>
                <input onChange={(e) => setNewEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? handleSave() : ""} id="editEmail" type="text" value={newEmail}/>
                </div>
              </div>
              <div>
                <span onClick={handleSave} className="profile-icons material-symbols-outlined save-profile">save</span> 
              </div>
            </div>
            <div onClick={() => setDeletePrompt(true)} style={{ color: "red", cursor: "pointer", marginTop: "5px", textAlign: "center", marginBottom: "20px", userSelect: "none" }}>Slett Bruker</div>
          </form>
      </div>

      )
      }

      <AnimatePresence>
      { deletePrompt && 
      
      <motion.div 
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      className="delete-user-container"
      >
        <div>Sikker på at du vil slette brukeren?</div>
        <div>
          <button className='btn-delete-profile' onClick={handleDeleteProfile}>Ja, slett brukeren!</button>
          <button className="btn-cancel-delete" onClick={() => setDeletePrompt(false)}>Avbryt</button>
        </div>
      </motion.div>      
      }
    </AnimatePresence>

    </>
  )
}

export default Profile