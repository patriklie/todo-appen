import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {

    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
      e.preventDefault();

      try {

        const response = await axios.post('http://localhost:5000/users/register', {
          username,
          email,
          password
        })
  
        const token = response.data;

        dispatch(loginUser());
        localStorage.setItem('userToken', token);

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
    <div className='spacer'></div>
    <div className="headline" style={{ textAlign: "center" }} >Registrer ny bruker:</div>

    <form onSubmit={handleRegister} className="register-form">
        <label htmlFor='register-username'>Brukernavn</label>
        <input type="text" id="register-username" autoComplete='username' value={username} onChange={(e) => setName(e.target.value)} required />
        <label htmlFor='register-email'>E-post</label>
        <input type="email" id="register-email" autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor='register-password'>Passord</label>
        <input type="password" id="register-password" autoComplete='current-password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button>Registrer ny bruker</button>
    </form>
    <p style={{ textAlign: "center", fontSize: "12px" }}>Har du allerede bruker? <Link to="/login">Logg på</Link></p>

    </>
  )
}

export default Register