
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import the useParams hook
import Product from './Product'; // Import the Product component

const ParentComponent = () => {
  const { productId } = useParams(); // Get the productId from route parameters

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
        try {
          if (!productId) {
            // productId is not defined, return early
            return;
          }
      
          const response = await axios.get(`http://localhost:5000/product/read/${productId}`);
          if (!response.data.success) {
            throw new Error(response.data.error || 'Failed to fetch product data');
          }
          console.log('Fetched product data:', response.data.data);
          setProduct(response.data.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      
    fetchProduct();
  }, [productId]); // Add productId as a dependency to useEffect

  return (
    <div>
      {product && <Product product={product} />} {/* Pass product as a prop */}
    </div>
  );
};

export default ParentComponent;
