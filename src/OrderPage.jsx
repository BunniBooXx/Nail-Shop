import React, { useRef, useEffect } from 'react';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import './orderpage.css';

const OrderPage = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  useEffect(() => {
    const myAPIKey = "d09060e63fea4428be40d8194e56abbf"; // Replace 'YOUR_API_KEY' with your actual API key

    // Initialize GeocoderAutocomplete for mailing address
    const autocomplete = new GeocoderAutocomplete(
      document.getElementById("autocomplete"), 
      myAPIKey,
      { /* Geocoder options */ }
    );

    autocomplete.on('select', (location) => {
      // Handle selected location here 
    });

    autocomplete.on('suggestions', (suggestions) => {
      // Process suggestions here
    });
   
  }, []);

  const handleShippingInfo = () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    

    // Address validation logic
    // Implement as per your requirements
  };

  return (
    <div className='background'>
    <div className="order-container">
      <div className="order-header">Mailing Address</div>
      <div className="order-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input id="firstName" ref={firstNameRef} type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input id="lastName" ref={lastNameRef} type="text" />
        </div>
       
          <label htmlFor="autocomplete">Mailing Address:</label>
          <div id="autocomplete" className="autocomplete-container"></div>
       
    </div>
    <div className="button-container">
        <button className="submit-btn" onClick={handleShippingInfo}>Continue</button>
      </div>
    </div>

  </div>
  );
};

export default OrderPage;
