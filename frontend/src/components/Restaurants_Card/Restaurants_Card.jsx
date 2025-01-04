import React from 'react'
import './Restaurants_Card.css';
import Restaurants_Card_Item from '../Restaurants_Card_Item/Restaurants_Card_Item';

const Restaurants_Card = () => {
  return (
    <>
        <div className="rest-card">
            <div className="rest-card-list">
            <Restaurants_Card_Item/>
            <Restaurants_Card_Item/>
            <Restaurants_Card_Item/>
            <Restaurants_Card_Item/>
            <Restaurants_Card_Item/>
            </div>
        </div>
    </>
  )
}

export default Restaurants_Card
