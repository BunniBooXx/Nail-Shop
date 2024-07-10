import React from 'react';
import './cancel.css';
import { Link } from 'react-router-dom';

const Cancel = () => {
    return (
        <div className="cancel-container">
            <div className="cancel-content">
                <h1>Payment Cancelled</h1>
                <p>We're sorry to see you cancel your payment. If you have any questions or need assistance, please contact our support team.</p>
                <Link to="/" className="back-home-button">Return to Home</Link>
            </div>
        </div>
    );
};

export default Cancel;
