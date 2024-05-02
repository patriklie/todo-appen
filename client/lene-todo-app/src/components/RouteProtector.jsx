import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../features/auth/authSlice';

const RouteProtector = ({ children }) => {

    const stateAuth = useSelector(state => state.auth);
    const stateToken = stateAuth.userToken;
    const stateLoggedIn = stateAuth.isAuth;
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchData = async () => {
            if (stateLoggedIn && stateToken) {
                try {
                    const response = await axios.get("http://localhost:5000/users/authtoken", {
            headers: {
                Authorization: `Bearer ${stateToken}`
            }
        })
            } catch (error) {
                console.error('Feil ved henting av authtoken:', error);
            }
            }
        };
    
        fetchData();

    }, [stateToken]);

  return (
    <>
        { stateLoggedIn ? children : <Navigate to="/login" /> }
    </>
  )
}

export default RouteProtector