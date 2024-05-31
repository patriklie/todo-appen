import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { loadLists } from '../features/list/listSlice';
import { motion } from "framer-motion";
import maskott from "../assets/images/IMG_0336-removebg.png"

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
    <motion.form onSubmit={handleLogin} className='fancy-form'
          initial={{ scale: .9 }}
          animate={{ scale: 1 }}
          transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
          }}
          >
      <div className='fancy-form-title'>Login</div>
      <div className='fancy-input-container'>
        <input type="text" id="email" autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} required  />
        <label htmlFor="email">Epost</label>
      </div>
      <div className='fancy-input-container'>
        <input type="password" id="passord" autoComplete='current-password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label htmlFor="passord">Passord</label>
        
      </div>
      <button>Login</button>
      <p style={{ textAlign: "center", fontSize: "12px" }}>Har du ikke bruker? <Link to="/register">Registrer deg her</Link></p>
      <img className="login-maskott-img" src={maskott}/>
    </motion.form>
    
    
    </>
  )
}

export default Login