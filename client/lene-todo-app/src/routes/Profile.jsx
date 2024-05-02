import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Profile = () => {

  const [profileData, setProfileData] = useState(null);
  const token = useSelector(state => state.auth.userToken)

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

  return (
    <>
    <div>Profile</div>
    <p>Username: { profileData && profileData.username }</p>
    <p>Email: { profileData && profileData.email }</p>
    </>
  )
}

export default Profile