import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { useAuth } from './useAuth'; // Import useAuth
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import AboutUs from './AboutUs';
import DevInfo from './DevInfo';
import SizingGuide from './SizingGuide';
import Profile from './Profile'; // Import Profile component
import Contact from './Contact';
import Shop from './Shop';
import Product from './Product';
import CartPage from './CartPage';
import OrderPage from './OrderPage';
import ProductForm from './ProductForm';
import OrderSuccessPage from './OrderSuccessPage';

function App() {
  return (
    <AuthProvider> {/* Ensure that AuthProvider wraps your entire application */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/devinfo" element={<DevInfo />} />
          <Route path="/sizing-guide" element={<SizingGuide />} />
          {/* Add userId prop to Profile component */}
          <Route path="/profile" element={<ProfileWithUserId />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/:orderId" element={<OrderPage />} />
          <Route path="/productform" element={<ProductForm />} />
          <Route path="/ordersuccesspage" element={<OrderSuccessPage />} />

          {/* Route to render Product component for dynamic product routes */}
          <Route path="/product/read/:productId" element={<Product />} />
          {/* Route to initiate Stripe Checkout */}
          <Route path="/checkout/:orderId" element={<Checkout />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider> 
  );
}

// Component to pass userId to Profile component
const ProfileWithUserId = () => {
  const { userId } = useAuth(); // Retrieve userId from the authentication context
  return <Profile userId={userId} />;
};

// Component to initiate Stripe Checkout
const Checkout = () => {
  const initiateCheckout = async () => {
    try {
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Add product details if required
        })
      });

      const session = await response.json();
      window.location = session.url;
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  // Call the function to initiate the checkout process
  initiateCheckout();

  return null;
};

export default App;
