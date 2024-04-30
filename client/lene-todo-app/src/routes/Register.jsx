import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Register = () => {

    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
      e.preventDefault();

      try {

        const response = await axios.post('http://localhost:5000/users/register', {
          username,
          email,
          password
        })
  
        console.log("Dette er response etter axios: ", response)
        const token = response.data;
        localStorage.setItem('jsonwebtoken', token);

        console.log("HER ER token fra local storage: ", localStorage.getItem("jsonwebtoken"))

        setName("");
        setEmail("");
        setPassword("");

      } catch(error) {
        console.log("Feil ved axios request: ", error)
      } 
    }

  return (
    <>
    <Navbar />
    <div style={{ textAlign: "center", marginTop: "40px" }}>Registrer en ny bruker til TODOappen:</div>

    <form onSubmit={handleRegister} className="register-form">
        <label htmlFor='register-username'>Username</label>
        <input type="text" id="register-username" value={username} onChange={(e) => setName(e.target.value)} required />
        <label htmlFor='register-email'>Epost</label>
        <input type="email" id="register-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor='register-password'>Passord</label>
        <input type="password" id="register-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button>Registrer ny bruker</button>
    </form>

    </>
  )
}

export default Register