import React from 'react';
import './EMenu.css';
import { menu_list } from '../../assets/assets';

const EMenu = ({ category, setCategory }) => {
  return (
    <>
      <div className="explore_menu" id="menu">
        <h1>Explore our menu</h1>
        <p className="explore-menu-p">Explore a wide variety of tasty foods</p>
        <div className="explore-menu-list">
          {menu_list.map((item, index) => (
            <div 
              key={index} 
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
              className="explore-menu-list-items"
            >
              <img 
                className={category === item.menu_name ? "active" : ""} 
                src={item.menu_image} 
                alt={item.menu_name} 
              />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EMenu;
