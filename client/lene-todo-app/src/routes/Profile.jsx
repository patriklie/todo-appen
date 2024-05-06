import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Profile = () => {

  const [profileData, setProfileData] = useState(null);
  const token = localStorage.getItem("userToken");
  const [editMode, setEditMode] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {

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


      
      } catch (error) {
        console.log(error);
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
          <div>Username: { profileData && profileData.username }</div>
          <div>Email: { profileData && profileData.email }</div>
          <span onClick={handleEdit} class="icons material-symbols-outlined edit-profile">edit</span>
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
        <span onClick={handleSave} class="icons material-symbols-outlined save-profile">save</span>
      </div>
      )
      }
    </>
  )
}

export default Profile