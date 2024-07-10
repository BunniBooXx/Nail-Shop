import React, { useRef, useEffect } from 'react';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import './orderpage.css';

const OrderPage = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const mailingStreetInputRef = useRef(null);
  const mailingCityInputRef = useRef(null);
  const mailingStateInputRef = useRef(null);
  const mailingCountryInputRef = useRef(null);
  const mailingPostcodeInputRef = useRef(null);

  useEffect(() => {
    const myAPIKey = "d09060e63fea4428be40d8194e56abbf";

    // Initialize GeocoderAutocomplete for mailing address
    new GeocoderAutocomplete(mailingStreetInputRef.current, myAPIKey, {
      allowNonVerifiedHouseNumber: true,
      allowNonVerifiedStreet: true,
      skipDetails: true,
      skipIcons: true,
      placeholder: " "
    });

    new GeocoderAutocomplete(mailingCityInputRef.current, myAPIKey, {
      type: "city",
      skipDetails: true,
      skipIcons: true,
      placeholder: " "
    });

    new GeocoderAutocomplete(mailingStateInputRef.current, myAPIKey, {
      type: "state",
      skipDetails: true,
      placeholder: " ",
      skipIcons: true
    });

    new GeocoderAutocomplete(mailingCountryInputRef.current, myAPIKey, {
      type: "country",
      skipDetails: true,
      placeholder: " ",
      skipIcons: true
    });
  }, []);

  const handleCheckAddress = () => {
    const mailingPostcode = mailingPostcodeInputRef.current.value;
    const mailingCity = mailingCityInputRef.current.querySelector('.geoapify-autocomplete-input').value;
    const mailingStreet = mailingStreetInputRef.current.querySelector('.geoapify-autocomplete-input').value;
    const mailingState = mailingStateInputRef.current.querySelector('.geoapify-autocomplete-input').value;
    const mailingCountry = mailingCountryInputRef.current.querySelector('.geoapify-autocomplete-input').value;

    // Address validation logic
    // Implement as per your requirements
  };

  return (
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
    <div className="form-group">
      <label htmlFor="mailingStreet">Street:</label>
      <input id="mailingStreet" ref={mailingStreetInputRef} type="text" />
    </div>
    <div className="form-group">
      <label htmlFor="mailingPostcode">ZIP code:</label>
      <input id="mailingPostcode" ref={mailingPostcodeInputRef} type="text" />
    </div>
    <div className="form-group">
      <label htmlFor="mailingCity">City:</label>
      <input id="mailingCity" ref={mailingCityInputRef} type="text" />
    </div>
    <div className="form-group">
      <label htmlFor="mailingState">State:</label>
      <input id="mailingState" ref={mailingStateInputRef} type="text" />
    </div>
    <div className="form-group">
      <label htmlFor="mailingCountry">Country:</label>
      <input id="mailingCountry" ref={mailingCountryInputRef} type="text" />
    </div>
  </div>
  <div className="button-container">
    <button className="submit-btn" onClick={handleCheckAddress}>Check Address</button>
  </div>
</div>

  );
};

export default OrderPage;
