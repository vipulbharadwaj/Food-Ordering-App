import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import SignIn from "./components/SignIn/SignIn";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Restaurants from "./Pages/Restaurants/Restaurants";
import Verify from "./Pages/Verify/Verify";
import MyOrders from "./Pages/MyOrders/MyOrders";

function App() {

  const [showLogin, setShowLogin] = useState(false);
  return (
    
    <BrowserRouter>
    {showLogin ? <SignIn setShowLogin={setShowLogin} /> : null}
      <div className="App">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder/>}/>
          <Route path="/restaurants" element={<Restaurants/>}/>
          <Route path="/verify" element={<Verify/>}/>
          <Route path="/myorders" element={<MyOrders/>}/>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
