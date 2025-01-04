import React, { useContext } from 'react';
import './FoodItem.css';
import { FcRating } from "react-icons/fc";
import { useState } from 'react';
import { ContextStore } from '../../store/ContextStore';

const FoodItem = ({ id, name, price, description, image }) => {
  const [isAdded, setIsAdded] = useState(false);
  const {addToCart, url} = useContext(ContextStore);
  const handleClick = () => {
    setIsAdded(true);
    addToCart(id);
  };

  return (
    <div className="food-item">
      <div className="food-item-images">
        <img className="food-item-image" src={url+"/images/"+image} alt={`Image of ${name}`} />
      </div>
      <div className="food-item-info">
        <div className="food-item-name">
          <h3>{name}</h3>
          <div className="food-item-rating">
            {[...Array(3)].map((_, index) => (
              <FcRating key={index} />
            ))}
          </div>
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="button-price">
        <p className="food-item-price"> &#8360; {price}</p>
        <button className={isAdded? "button-added" :"button"} onClick={handleClick}>{isAdded ? 'Added' : 'Add to Cart'}</button>
        </div>
        
      </div>
    </div>
  );
};

export default FoodItem;
