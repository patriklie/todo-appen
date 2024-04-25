import React, { useState } from 'react'

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
    }

  return (
    <>
    <div style={{ textAlign: "center", marginTop: "40px" }}>Registrer en ny bruker til TODOappen:</div>

    <form onSubmit={handleRegister} className="register-form">
        <label htmlFor='register-name'>Navn</label>
        <input type="text" id="register-name" value={name} onChange={(e) => setName(e.target.value)} required />
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