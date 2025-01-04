import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatus=async(e, orderId)=>{
    try {
      const response = await axios.post(url+"/api/order/status", {orderId, status: e.target.value})
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating order status');
    }
    
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : orders.length > 0 ? (
        <div className="order-container">
          <h3>Order Page</h3>
          <div className="order-list">
            {orders.map((order, index) => (
              <div key={index} className="order-item">
                <img src='./order.png' alt="order-icon" />
                <div>
                  <p className="order-item-food">
                    {order.items.map((item, idx) => (
                      `${item.name} x ${item.quantity}${idx < order.items.length - 1 ? ', ' : ''}`
                    ))}
                  </p>
                  <p className="order-item-name">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <div className="order-item-address">
                    <p>{order.address.street},</p>
                    <p>{order.address.city}, {order.address.state}, {order.address.zipcode}</p>
                  </div>
                  <p className="order-item-phone">{order.address.phone}</p>
                </div>
                <p className="order-item-amount">${order.amount}.00</p>
                <select onChange={(e)=>handleStatus(e, order._id)} defaultValue={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-orders">No Orders Available</div>
      )}
    </>
  );
};

export default Orders;
