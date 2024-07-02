import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout, loginWithToken } from '../features/auth/authSlice';
import { loadLists } from '../features/list/listSlice';

const RouteProtector = ({ children }) => {

    const stateAuth = useSelector(state => state.auth);
    const stateLoggedIn = stateAuth.isAuth;
    const token = localStorage.getItem("token");
    const stateToken = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tokenCheck, setTokenCheck] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            if (token) {
                try {
                    const response = await axios.get("http://localhost:5000/users/authtoken", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                    });
                    
                    dispatch(loginWithToken(response.data));
                    setTokenCheck(true);
                    dispatch(loadLists())

            } catch (error) {
                console.error('Feil ved henting av authtoken:', error);
                dispatch(logout());
                localStorage.removeItem("token");
                setTokenCheck(false);
                navigate("/login");
                }
            }

            if (!token) {
                setTokenCheck(false);
                navigate("/login");
            }
        };
    
        fetchData();

    }, [tokenCheck]);

    console.log("Token check:", tokenCheck);
    console.log("Logged in:", stateLoggedIn);

    return (
        <>
            {tokenCheck ? children : <p>Sjekker authtoken...</p>}
        </>
    )
}

export default RouteProtector