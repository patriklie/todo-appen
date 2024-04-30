import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from 'axios';


const RouteProtector = ({ children }) => {

    const stateAuth = useSelector(state => state.auth);
    const stateToken = stateAuth.userToken;
    const stateLoggedIn = stateAuth.isAuth;

    const authToken = async (token) => {
        const response = await axios.get("http://localhost:5000/authtoken", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(response.data);
    }

    const checkAuth = () => {
        
    }

    // jeg må sjekke om det er et token
    // verifisere token
    // gi info om den expires soon?
    // ingen token så må jeg be de logge inn eller registrere


  return (
    <>
        { stateLoggedIn ? {children} : <Navigate to="/login" /> }
    </>
  )
}

export default RouteProtector