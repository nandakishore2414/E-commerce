import React from 'react'
import Navbar from './component/NavBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet/>
    </div>
  )
}

export default Layout
