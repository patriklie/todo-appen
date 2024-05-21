import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

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

        setEmail("");
        setPassword("");

        dispatch(login());
        localStorage.setItem("userToken", token);
        navigate("/");
        toast.success("Logget inn!", {
          position: "bottom-left",
          autoClose: 3000,
        });

      } catch (error) {
        console.log("Feil ved axios request: ", error);

        toast.error(`${ error.response.data }`, {
          position: "bottom-left",
          autoClose: 3000,
      });
      } 
    }

  return (
    <>
    <Navbar />
    <div style={{ textAlign: "center", marginTop: "120px" }}>Login på TODOappen:</div>

    <form onSubmit={handleLogin} className="login-form">
        <label htmlFor='login-email'>Epost</label>
        <input type="email" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor='login-password'>Passord</label>
        <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button>Login</button>
    </form>
    <p style={{ textAlign: "center", fontSize: "12px" }}>Har du ikke bruker? <Link to="/register">Registrer deg her</Link></p>
    </>
  )
}

export default Login