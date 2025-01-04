import React, { useEffect } from 'react'
import './List.css'
import { useState } from 'react'
import axios from "axios";
import { MdDelete } from "react-icons/md";
import Loader from '../../components/Loader/Loader';
import { toast } from "react-toastify";

const List = () => {
  const url = "https://food-ordering-backend-iklx.onrender.com";
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/food/list`);
        setListData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally{
        setLoading(false);
      }
    };
    fetchData();
  },[]);

  const handleDelete=async(id)=>{
    try {
      const response = await axios.post(`${url}/api/food/remove`,{id})
      setListData(listData.filter(item => item._id !== id));
      toast.success(response.data.message)
    } catch (error) {
      
    }
  }

  

  return (
    <>
       <div className="food-list-container">
       {loading? (<Loader/>):
       listData.length > 0 ? (
        <div className="food-list">
          {listData.map((item) => (
            <div key={item._id} className="food-card">
              <div className="food-image-container">
                <img src={`${url}/images/${item.image}`} alt={item.name} className="food-image" />
              </div>
              <div className="food-content">
                <h2 className="food-name">{item.name}</h2>
                <p className="food-description">{item.description}</p>
                <div className="food-info">
                  <span className="food-price">${item.price}</span>
                  <span className="food-category">{item.category}</span>
                </div>
                <div className="delete-button" onClick={()=>handleDelete(item._id)}><MdDelete /></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data-message">No data available</p>
      )}
    </div>
    </>
  )
}

export default List
