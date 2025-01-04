import React, { useContext } from "react";
import "./Cart.css";
import { ContextStore } from "../../store/ContextStore";
import { CiCircleRemove } from "react-icons/ci";
import { IoMdRemoveCircle } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";
import { Navigate, useNavigate } from "react-router-dom";



const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart, deleteFromCart, getTotalCartAmount, url} = useContext(ContextStore);
  const Navigate = useNavigate();

  return (

    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Unit Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <>
                <div key={index} className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="item_image" />
                  <p>{item.name}</p>

                  <p>
                  {item.price.toFixed(2)}
                  </p>
                  <p className="add-remove">
                  <IoMdRemoveCircle className="remove" onClick={()=>removeFromCart(item._id)} />{cartItems[item._id]}
                  <IoMdAddCircle className="add" onClick={()=>addToCart(item._id)}/></p>
                  <p>{(cartItems[item._id] * item.price).toFixed(2)}</p>
                  <CiCircleRemove onClick={() => deleteFromCart(item._id)} className="remove-cart" />
                </div>
                <hr />
              </>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
      <div className="cart-code">
          <div>
            <p>Enter Promocode, if u have any?</p>
            <div className="cart-code-input">
              <input type="text" placeholder="PromoCode"/>
              <button>Submit</button>
            </div>
          </div>
        </div>
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Shipping Charges</p>
              <p>{getTotalCartAmount()===0?0:60}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              {getTotalCartAmount()===0?0:getTotalCartAmount()+60}
            </div>
            <button onClick={()=> Navigate('/order')}>Proceed to checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
