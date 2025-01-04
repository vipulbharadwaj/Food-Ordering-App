import React, { useContext } from 'react'
import './FoodMenu.css'
import { ContextStore } from '../../store/ContextStore'
import FoodItem from '../FoodItem/FoodItem';

const FoodMenu = ({category}) => {
    const {food_list} = useContext(ContextStore);
  return (
    <>
        <div className="food-menu" id='food-menu'>
            <h2>Discover the best dishes</h2>
            <div className="food-menu-list">
                {food_list.map((item, index)=>{
                    if(category==="All" || category === item.category){
                        return <FoodItem key ={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                    }
                    
                })}
            </div>
        </div>
    </>
  )
}

export default FoodMenu
