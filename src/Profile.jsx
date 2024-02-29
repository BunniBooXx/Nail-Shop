
import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('US');
    const [zipCode, setZipCode] = useState('');

    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [creditCardZipCode, setCreditCardZipCode] = useState('');

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    const handleZipCodeChange = (e) => {
        setZipCode(e.target.value);
    };

    const handleCreditCardNumberChange = (e) => {
        setCreditCardNumber(e.target.value);
    };

    const handleExpirationDateChange = (e) => {
        setExpirationDate(e.target.value);
    };

    const handleCvcChange = (e) => {
        setCvc(e.target.value);
    };

    const handleCreditCardZipCodeChange = (e) => {
        setCreditCardZipCode(e.target.value);
    };

    const saveAddress = () => {
        // Code to save address
        console.log('Address saved:', address, city, state, country, zipCode);
    };

    const saveCreditCard = () => {
        // Code to save credit card using Stripe
        console.log('Credit card saved:', creditCardNumber, expirationDate, cvc, creditCardZipCode);
    };

    return (
        <div className="profile-container">
            <div className="avatar-section">
                <h2 className="section-title">Choose Your Avatar</h2>
                <div className="avatar-selection">
                <a href="#" className="avatar-link">
                    <img src="./blue_eye_avatar.png" alt="Avatar 1" className="avatar" />
                    </a>
                <a href="#" className="avatar-link"> 
                    <img src="./blonde_heart_avatar.png" alt="Avatar 2" className="avatar" />
                    </a>
                    <a href="#" className="avatar-link">
                    <img src="./brown_avatar.png" alt="Avatar 3" className="avatar" />
                    </a>
                    <a href="#" className="avatar-link">
                    <img src="./green_eye_avatar.jpg" alt="Avatar 4" className="avatar" />
                    </a>
                    <a href="#" className="avatar-link">
                    <img src="./black_avatar.png" alt="Avatar 5" className="avatar" />
                    </a>
                    <a href="#" className="avatar-link">
                    <img src="./red_avatar.png" alt="Avatar 6" className="avatar" />
                    </a>
                    <a href="#" className="avatar-link">
                    <img src="./blonde_avatar.png" alt="Avatar 7" className="avatar" />
                    </a>
                    {/* Add avatar images here */}
                </div>
            </div>
            <div className="address-section">
                <h2 className="section-title">Address Information</h2>
                <div className="address-form">
                    <input
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        onChange={handleAddressChange}
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={handleCityChange}
                    />
                    <input
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={handleStateChange}
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={handleCountryChange}
                    />
                    <input
                        type="text"
                        placeholder="Zip Code"
                        value={zipCode}
                        onChange={handleZipCodeChange}
                    />
                    <button onClick={saveAddress}>Save Address</button>
                </div>
                {address && (
                    <div className="address-actions">
                        <button>Edit Address</button>
                        <button>Delete Address</button>
                    </div>
                )}
            </div>
            <div className="credit-card-section">
                <h2 className="section-title">Credit Card Information</h2>
                <div className="credit-card-form">
                    <input
                        type="text"
                        placeholder="Credit Card Number"
                        value={creditCardNumber}
                        onChange={handleCreditCardNumberChange}
                    />
                    <input
                        type="text"
                        placeholder="Expiration Date"
                        value={expirationDate}
                        onChange={handleExpirationDateChange}
                    />
                    <input
                        type="text"
                        placeholder="CVC"
                        value={cvc}
                        onChange={handleCvcChange}
                    />
                    <input
                        type="text"
                        placeholder="Zip Code"
                        value={creditCardZipCode}
                        onChange={handleCreditCardZipCodeChange}
                    />
                    <button onClick={saveCreditCard}>Save Credit Card</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
