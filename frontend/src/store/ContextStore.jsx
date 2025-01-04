import React, { createContext, useState, useEffect } from "react";
//import { food_list } from "../assets/assets";
import axios from "axios";

export const ContextStore = createContext(null);

const ContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);



  const addToCart = async(itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if(token){
      await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 0) {
        updatedCart[itemId]--;
      }
      return updatedCart;
    });
    try {
      if (token) {
        await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  
    
  };

  const deleteFromCart = async(itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
    if (token) {
      try {
        await axios.post(`${url}/api/cart/delete`, { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error deleting item from cart:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    return food_list.reduce((total, item) => {
      const quantity = cartItems[item._id] || 0;
      return total + item.price * quantity;
    }, 0);
  };

  const fetchFoodList = async()=>{
    const response = await axios.get(url+"/api/food/list")
    setFoodList(response.data.data);
    console.log(response);
  }

  const loadCartData = async(token)=>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);

  }

  useEffect(() => {
    async function loadData(){
      await fetchFoodList();
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"));
      await loadCartData(localStorage.getItem("token"))
    }
  }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    showLoader,
    hideLoader,
    loading,
  };

  return (
    <ContextStore.Provider value={contextValue}>
      {props.children}
    </ContextStore.Provider>
  );
};

export default ContextProvider;
