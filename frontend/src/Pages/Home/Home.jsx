import React from 'react'
import './Home.css';
import Header from '../../components/Header/Header';
import EMenu from '../../components/EMenu/EMenu';
import { useState } from 'react';
import FoodMenu from '../../components/FoodMenu/FoodMenu';
import AppPromotion from '../../components/AppPromotion/AppPromotion';

const Home = () => {
  const [category, setCategory] = useState("All");
  console.log("Current category in Home:", category);
  return (
    <div>
    <Header/>
    <EMenu category={category} setCategory={setCategory}/>
    <FoodMenu category={category}/>
    <AppPromotion/>
    </div>
  )
}

export default Home
