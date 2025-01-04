import React, { Profiler, useContext } from 'react'
import "./Navbar.css"
import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { IoBagHandle } from "react-icons/io5";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContextStore } from '../../store/ContextStore';

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");
  const {getTotalCartAmount, token, setToken} = useContext(ContextStore);

  const navigate = useNavigate();

  const logout =()=>{
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  }
  return (
    <>
      <nav className="navbar">
      <div className="logo">
      <img src="/cook_icon.png" className="cook-logo" alt="logo" />
      <Link to="/"><span className="highlight">Q</span>uick<span>Bite!</span></Link>
      </div>
        <div className="nav-menu">
          <ul>
            <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}> <Link to='/'>Home </Link></li>
            <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}><a href="#menu">Menu</a></li>
            <li onClick={()=>setMenu("restaurants")} className={menu==="restaurants"?"active":""}> <Link to="/restaurants">Restaurants</Link></li>
            <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}><a href="#footer">Contact us</a></li>
          </ul>
        </div>

        <div className="nav-right">
        <div className="search-icon">
        <FaSearch />
        </div>
        <div className="basket-icon">
         <Link to="/cart"><FaCartPlus /></Link> 
         <div className={getTotalCartAmount()===0? "":"dot"}></div>
        </div>
        {!token?  <button onClick={()=>setShowLogin(true)}>Sign In</button>: (<div className="navbar-profile">
        <img src="/food_3.png" alt="" />
          <ul className="nav-profile-dropdown">
          <li ><CgProfile className='profile-icons' /><p>Profile</p></li>
          <hr />
            <li onClick={()=>navigate('/myorders')}><IoBagHandle className='profile-icons'/><p>Orders</p></li>
            <hr />
            <li onClick={logout}><IoMdLogOut className='profile-icons' /><p>Logout</p></li>
          </ul>
        </div>)}
       
        </div>
        

      </nav>
    </>
  )
}

export default Navbar
