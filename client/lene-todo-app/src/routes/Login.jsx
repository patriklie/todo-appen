import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';
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

        const token = response.data.token;
        const username = response.data.username;

        setEmail("");
        setPassword("");

        dispatch(loginUser({ username }));

        localStorage.setItem("userToken", token);
        navigate("/");
        toast.success(`${username} logget inn!`, {
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
    <div className='spacer'></div>
    <div className='headline' style={{ textAlign: "center" }}>Login:</div>

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