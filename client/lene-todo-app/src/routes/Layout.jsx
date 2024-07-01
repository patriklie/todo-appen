import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DragMenu from '../components/DragMenu';

const Layout = () => {

  return (
    <>
    <Navbar />
    <Outlet />
    <DragMenu />
    </>
  )
}

export default Layout;