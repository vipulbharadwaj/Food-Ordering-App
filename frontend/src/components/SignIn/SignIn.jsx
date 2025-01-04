import React, { useContext, useState } from "react";
import "./SignIn.css";
import { MdCancel } from "react-icons/md";
import {ContextStore} from '../../store/ContextStore';
import axios from "axios";

const SignIn = ({ setShowLogin }) => {
  const {url, setToken, token} = useContext(ContextStore);
  const [curr, setCurr] = useState("Sign In");
  const [data, setData] = useState({
    name: "",
    email: "",
    password:"",
    phone:"",
  })

  const handleChange =(e)=>{
    const {name, value} = e.target;
    setData({...data, [name]: value})
  }

  const signIn = async (e) => {
    e.preventDefault();
    let newurl = url;
    if (curr === "Sign In") {
      newurl += "/api/user/login";
    } else {
      newurl += "/api/user/register";
    }
  
    try {
      const response = await axios.post(newurl, data);
      console.log(response);
      if (response) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert(response.data.message);
    }
  };

  return (
    <>
      <div className="signin">
        <form onSubmit={signIn} className="signin-container">
          <div className="signin-title">
            <h2>{curr}</h2>
              <MdCancel className="cross-icon" onClick={() => setShowLogin(false)}/>
          </div>
          <div className="signin-inputs">
            {curr === "Sign In" ? (
              <></>
            ) : (
              <>
                <input type="text" placeholder="Name" name="name" onChange={handleChange} value={data.name} required />
                <input type="number" placeholder="Phone No" name="phone" onChange={handleChange} value={data.phone} required />
              </>
            )}

            <input type="email" placeholder="email" name="email" value={data.email} onChange={handleChange} required />

            <input type="password" placeholder="Password" name="password" value={data.password} onChange={handleChange}required />
          </div>
          <button type="submit"> {curr === "Sign Up" ? "Create account" : "Sign In"} </button>
          <div className="signin-tc">
            <input type="checkbox" required />
            <p>By Continuing, i agree to terms of use & privacy policy</p>
          </div>
          {
            curr==="Sign In"? <p>Don't haven't account yet? <span onClick={()=>setCurr("Sign Up")}>Click here</span></p>:
            <p>Already have an account? <span onClick={()=>setCurr("Sign In")}>click here</span></p>
          }
            
        </form>
      </div>
    </>
  );
};

export default SignIn;
