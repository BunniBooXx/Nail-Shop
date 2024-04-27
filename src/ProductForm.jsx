import React, { useState } from 'react';
import 'daisyui/dist/full.css';
import axios from 'axios'; // Import Axios
import './ProductForm.css';

const ProductForm = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity_available', quantity);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/product/create', formData);

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to create product');
      }

      setMessage('Product created successfully');
      // You can redirect or show a success message here
    } catch (error) {
      console.error('Error creating product:', error.message);
      setMessage(error.message || 'Failed to create product');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label htmlFor="productName" className="label">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={handleProductNameChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label htmlFor="description" className="label">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div>
          <label htmlFor="price" className="label">
            Price
          </label>
          <input
            type="text" // Changed from "number" to "text"
            id="price"
            value={price}
            onChange={handlePriceChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label htmlFor="quantity" className="label">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label htmlFor="image" className="label">
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Product
        </button>
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
};

export default ProductForm;

