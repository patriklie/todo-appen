import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { loadLists } from '../features/list/listSlice';
import { motion } from "framer-motion";

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
  
        const token = response.data.token;
        const username = response.data.username;

        setEmail("");
        setPassword("");

        dispatch(loginUser({ username, token }));
        localStorage.setItem("userToken", token);
        dispatch(loadLists())
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


  

    <motion.div className='login-container'
      initial={{ scale: .9 }}
      animate={{ scale: 1 }}
      transition={{
      type: "spring",
      stiffness: 260,
      damping: 20
      }}
      >
    <div className='headline' style={{ textAlign: "center" }}>Login</div>
    <form onSubmit={handleLogin} className="login-form">
        <label htmlFor='login-email'>Epost</label>
        <input type="email" id="login-email" autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor='login-password'>Passord</label>
        <input type="password" id="login-password" autoComplete='current-password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button>Login</button>
    </form>
    <p style={{ textAlign: "center", fontSize: "12px" }}>Har du ikke bruker? <Link to="/register">Registrer deg her</Link></p>
    </motion.div>
   

    <form className='fancy-form'>
      <div className='fancy-input-container'>
        <input type="text" id="email" required />
        <label htmlFor="email">Epost</label>
      </div>
      <div className='fancy-input-container'>
        <input type="password" id="passord" required />
        <label htmlFor="passord">Passord</label>
      </div>
    </form>

    </>
  )
}

export default Login