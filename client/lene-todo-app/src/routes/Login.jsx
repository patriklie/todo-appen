import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import Navbar from '../components/Navbar';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post('http://localhost:5000/users/login', {
          email,
          password
        })
  
        console.log("Dette er response etter axios: ", response)
        const token = response.data;
        localStorage.setItem('jsonwebtoken', token);

        console.log("HER ER token fra local storage: ", localStorage.getItem("jsonwebtoken"))

        setEmail("");
        setPassword("");

        dispatch(login(response.data));

        navigate("/");

      } catch (error) {
        console.log("Feil ved axios request: ", error)
      } 
    }

  return (
    <>
    <Navbar />
    <div style={{ textAlign: "center", marginTop: "40px" }}>Login på TODOappen:</div>

    <form onSubmit={handleLogin} className="login-form">
        <label htmlFor='login-email'>Epost</label>
        <input type="email" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor='login-password'>Passord</label>
        <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button>Login</button>
    </form>

    </>
  )
}

export default Login