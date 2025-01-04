import React from 'react';
import './Sidebar.css';
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaListUl, FaBoxOpen } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <IoMdAddCircleOutline className='icon' />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <FaListUl className='icon' />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <FaBoxOpen className='icon' />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
