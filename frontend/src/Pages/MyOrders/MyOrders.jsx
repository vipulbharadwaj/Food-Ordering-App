import React, { useState } from 'react'
import './MyOrders.css'
import { useContext } from 'react';
import { ContextStore } from '../../store/ContextStore';
import { useEffect } from 'react';
import axios from "axios";
import Loader from "../../components/Loader/Loader"

const MyOrders = () => {
    const [data, setData] = useState([]);
    const {url, token, loading, showLoader, hideLoader} = useContext(ContextStore);

    const fetchOrders =async()=>{
        try {
            showLoader();
            const response = await axios.post(
                `${url}/api/order/userorders`,
                {},
                { headers: { token } }
            );
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            hideLoader();
        }
    }

    useEffect(()=>{
        if(token){
        fetchOrders();
        }
    },[token]);

  return (
    <>
    {loading && <Loader/>}
    <div className="my-orders">
        <h1>My Orders</h1>
        <div className="orders">
            {data.map((order, index) => (
                <div className='order' key={index}>
                <img src="./order.png" alt="order-icon" />
                <p>{order.items.map((item, index)=>{
                   if(index===order.items.length-1){
                    return item.name+" x "+item.quantity
                   }
                   else{
                    return item.name+" x "+item.quantity+", "
                   }
                })}</p>
                <p>{order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                <button onClick={fetchOrders}>Track Order</button>
                </div>
                ))}
        </div>
    </div>

    </>
  )
}

export default MyOrders
