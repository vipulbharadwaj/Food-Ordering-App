import React from "react";
import "./Add.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const url = "https://food-ordering-backend-iklx.onrender.com";
  const category = [
    "Rolls",
    "Salad",
    "Deserts",
    "Cake",
    "PureVeg",
    "Pasta",
    "Noodles",
    "SandWich",
    "Pizza",
  ];
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    const price = Number(data.price);
    formData.append("price", price);
    formData.append("category", data.category);
    formData.append("image", imageFile);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      console.log("Success:", response.data);
      setData({
        name: "",
        description: "",
        price: "",
        category: "",
      });
      setImageFile(null);
      setImagePreview(null);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <div className="add">
        <form onSubmit={handleSubmit} className="flex-col">
          <div className="add-img flex-col">
            <p>Upload Image</p>
            <input
              type="file"
              id="image"
              required
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="image-preview" />
            )}
          </div>
          <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              value={data.name}
              placeholder="Type here"
            />
          </div>
          <div className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea
              onChange={handleChange}
              value={data.description}
              name="description"
              placeholder="Type here"
              rows="6"
            ></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Category</p>
              <select
                onChange={handleChange}
                name="category"
                value={data.category}
              >
                <option value="">Select Category</option>
                {category.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Price</p>
              <input
                onChange={handleChange}
                value={data.price}
                type="number"
                name="price"
                placeholder="20"
              />
            </div>
          </div>
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default Add;
