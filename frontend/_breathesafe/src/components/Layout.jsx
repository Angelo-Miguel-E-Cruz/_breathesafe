import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar'

function Layout({setAuth, role}) {
  return (
    <div>
      <NavBar role={role} setAuth={setAuth}/>
      <Outlet /> 
    </div>
  );
}

export default Layout;
