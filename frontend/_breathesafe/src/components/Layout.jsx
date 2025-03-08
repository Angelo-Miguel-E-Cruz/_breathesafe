import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar'

function Layout({setAuth, role}) {
  return (
    <div>
      <NavBar role={role}/>
      <Outlet /> 
    </div>
  );
}

export default Layout;
