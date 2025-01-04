import React from "react";
import { FcRating } from "react-icons/fc";
import './Restaurants_Card_Item.css';

const Restaurants_Card_Item = () => {
  return (
    <>
      <div className="rest-item">
        <div className="rest-item-images">
          <img
            className="rest-item-image"
            src="food_3.png"
            alt="Restaurants-Image"
          />
        </div>
        <div className="rest-item-info">
          <div className="rest-item-name">
            <h3>Dominos</h3>
            <div className="rest-item-rating-review">
            {[...Array(3)].map((_, index) => (
              <FcRating key={index} />
            ))}
              <p className="no-review">(140)</p>
            </div>
          </div>
          <p className="rest-item-desc">Get the best pizzas</p>
          <p className="rest-item-address">
          143 Street, Place, City-200003, State{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Restaurants_Card_Item;
