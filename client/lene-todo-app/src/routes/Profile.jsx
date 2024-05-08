import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Profile = () => {

  const [profileData, setProfileData] = useState(null);
  const token = localStorage.getItem("userToken");
  const [editMode, setEditMode] = useState(false);

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

  return (
    <>
      { !editMode ? 
      (
        <div className='container profile'>
          <div>Username: <span style={{ cursor: "pointer" }} onClick={handleEdit} >{ profileData && profileData.username }</span></div>
          <div>Email: <span style={{ cursor: "pointer" }} onClick={handleEdit}>{ profileData && profileData.email }</span></div>
          <span onClick={handleEdit} class="profile-icons material-symbols-outlined edit-profile">edit</span>
        </div>
      )
        :
      (
        <div className='container profile'>
          <form className="form-edit-profile">
            <div>
              <label htmlFor='editUsername'>Username: </label>
              <input onChange={(e) => setNewUsername(e.target.value)} id="editUsername" type="text" value={newUsername}/>
            </div>
            <div>
              <label htmlFor='editEmail'>Email: </label>
              <input onChange={(e) => setNewEmail(e.target.value)} id="editEmail" type="text" value={newEmail}/>
            </div>
          </form>
        <span onClick={handleSave} className="profile-icons material-symbols-outlined save-profile">save</span>
      </div>
      )
      }
    </>
  )
}

export default Profile