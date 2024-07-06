import React from 'react'
import IconContainer from './IconContainer';
import Navbar from '../components/Navbar';
import maskottLiten from '../assets/images/Maskott-utklipp.png';

const AuthenticateLoader = () => {
  return (
    <>
    <Navbar />
    <div className='loader-list-container'>
        <IconContainer iconName={"wired-outline-213-arrow-2-rounded-black"} reveal={"loop-cycle"} hover={"hover-rotation"} size={50}  />
        <div className='load-list-text'>Godkjenner token...</div>
        <img className='liten-maskott' src={maskottLiten} />
    </div>
    </>
  )
}

export default AuthenticateLoader;