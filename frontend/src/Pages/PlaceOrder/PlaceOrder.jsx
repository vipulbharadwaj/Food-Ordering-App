import React, { useContext, useEffect } from 'react';
import './PlaceOrder.css';
import { ContextStore } from '../../store/ContextStore';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/Loader/Loader"

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const cities = [
  "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai",
  "Kolkata", "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur",
  "Indore", "Bhopal", "Patna", "Vadodara", "Agra", "Nashik", "Faridabad"
];

const PlaceOrder = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getTotalCartAmount, token, food_list, cartItems, url, showLoader, hideLoader} = useContext(ContextStore);

  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    phone:""
  })

  const onChange=(e)=>{
    const {name, value} = e.target;
    setData({...data, [name]: value})
  }

  const placeOrder=async(e)=>{
    e.preventDefault();
    setLoading(true);
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData ={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+60,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      
      if (response.data.success) {
          const { session_url } = response.data;
          window.location.href = session_url;
          alert("Order Placed Successfully");
      } else {
          alert("Failed to place order");
      }
  } catch (error) {
      console.error('Error placing order:', error);
      setError("An error occurred while placing the order");
  } finally {
      setLoading(false);
  }
  }

  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }
    else if(getTotalCartAmount===0){
      navigate('/cart')
    }
  })
  return (
    <>
    {loading && <Loader/>}
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Shipping</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" name='firstName' onChange={onChange} value={data.firstName} required />
          <input type="text" placeholder="Last Name" name='lastName' onChange={onChange} value={data.lastName} required />
        </div>
        <input type="email" placeholder="Email" name='email' value={data.email} onChange={onChange} required />
        <input type="text" placeholder="Street" name ='street' value={data.street} onChange={onChange} required />

        <div className="multi-fields">

        <select placeholder="State" name='state' value={data.state} onChange={onChange} required>
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
          <select placeholder="City" name='city' value={data.city} onChange={onChange} required>
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip Code" name='zipcode' value={data.zipcode} onChange={onChange} required />
        </div>
        <input type="tel" placeholder="Phone" name='phone' value={data.value} onChange={onChange} required pattern="[0-9]{10}" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Shipping Charges</p>
              <p>{getTotalCartAmount()===0?0:20.00}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{(getTotalCartAmount()===0?0:getTotalCartAmount() + 60).toFixed(2)}</b>
            </div>
            <button className={`order-btn ${loading ? 'loading' : ''}`} type="submit" disabled={loading}>
            {loading?'Processing...':'Proceed to Payment'}</button>
          </div>
        </div>
      </div>
    </form>
    </>
  );
};

export default PlaceOrder;
