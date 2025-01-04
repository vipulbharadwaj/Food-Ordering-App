import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./pages/list/List";
import Orders from "./pages/orders/Orders";
import Add from "./pages/add/Add";
import Sidebar from "./components/sidebar/Sidebar";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const url = "http://localhost:4000";
  return (
    <BrowserRouter>
      <div>
      <ToastContainer/>
        <Navbar />
        <hr />
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders url={url}/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
