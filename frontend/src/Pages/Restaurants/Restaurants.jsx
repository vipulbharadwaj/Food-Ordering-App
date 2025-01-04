import React, { useState } from 'react'
import './Restaurants.css'
import Restaurants_Card from '../../components/Restaurants_Card/Restaurants_Card'

const Restaurants = () => {
    const [isSort, setIsSort] = useState("veg");
  return (
    <>
        <div className="rest-content">
        <h2>Restaurants</h2>
        </div>
        <hr />
        <div className="sort">
            <p className={isSort==="veg"? "active" : "veg"} onClick={()=>{setIsSort("veg")}}>Veg</p>
            <p className={isSort==="sort_review"? "active": ""} onClick={()=>setIsSort("sort_review")}>Sort by Reveiws</p>
            <p className={isSort==="sort_ratings"? "active":""} onClick={()=>setIsSort("sort_ratings")}>Sort by Ratings</p>
        </div>
        <Restaurants_Card/>
    </>
  )
}

export default Restaurants
