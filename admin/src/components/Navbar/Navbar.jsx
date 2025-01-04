import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <>
        <nav className="navbar">
        <div className="logo">
           <a href="/"><span className="highlight">Q</span>uick<span>Bite!</span></a>
        </div>
        <img className="profile" src="/profilepic.png" alt="profile_logo" />
        </nav>
    </>
  )
}

export default Navbar
