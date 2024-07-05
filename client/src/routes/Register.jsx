import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { loadLists } from '../features/list/listSlice';
import { motion } from "framer-motion";
import maskott from "../assets/images/IMG_0336-removebg.png"

const Register = () => {

    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
          username,
          email,
          password
        })
  
        const token = response.data;
        dispatch(loginUser({ username, token }));
        localStorage.setItem('token', token);
        dispatch(loadLists())
        setName("");
        setEmail("");
        setPassword("");
        navigate("/");

      } catch(error) {
        console.log("Feil ved axios request: ", error)
      } 
    }

  return (
    <>
    <Navbar />
    <div className='login-register-padding'>
      <motion.form 
      onSubmit={handleRegister} 
      className='fancy-form'
      initial={{ scale: .9 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className='fancy-form-title'>Registrer</div>

        <div className='fancy-input-container'>
          <input type="text" id="username" value={username} onChange={(e) => setName(e.target.value)} required />
          <label htmlFor="username">Brukernavn</label>
        </div>
        
        <div className='fancy-input-container'>
          <input type="text" id="email" autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} required  />
          <label htmlFor="email">Epost</label>
        </div>

        <div className='fancy-input-container'>
          <input type="password" id="passord" autoComplete='current-password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label htmlFor="passord">Passord</label>
        </div>

        <button>Registrer</button>
        <p style={{ textAlign: "center", fontSize: "12px" }}>Har du allerede bruker? <Link to="/login">Logg på</Link></p>
        <img className="login-maskott-img" src={maskott}/>
        
    </motion.form>
  </div>
  </>
  )
}

export default Register;