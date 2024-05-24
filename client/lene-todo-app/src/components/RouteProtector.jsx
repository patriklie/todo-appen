import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout, loginWithToken } from '../features/auth/authSlice';

const RouteProtector = ({ children }) => {

    const stateAuth = useSelector(state => state.auth);
    const stateLoggedIn = stateAuth.isAuth;
    const userToken = localStorage.getItem("userToken");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tokenCheck, setTokenCheck] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            if (userToken) {
                try {
                    const response = await axios.get("http://localhost:5000/users/authtoken", {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                    });
                    const username = response?.data?.username
                    dispatch(loginWithToken({ username }));
                    setTokenCheck(true);

            } catch (error) {
                console.error('Feil ved henting av authtoken:', error);
                dispatch(logout());
                localStorage.removeItem("userToken");
                setTokenCheck(false);
                navigate("/login");
                }
            }

            if (!userToken) {
                setTokenCheck(false);
                navigate("/login");
            }
        };
    
        fetchData();

    }, [userToken, tokenCheck]);

    console.log("Token check:", tokenCheck);
    console.log("Logged in:", stateLoggedIn);

    return (
        <div>
            <div className='spacer'></div>
            {tokenCheck ? children : <p>Sjekker authtoken...</p>}
        </div>
    )
}

export default RouteProtector