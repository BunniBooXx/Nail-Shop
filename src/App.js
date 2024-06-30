import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./useAuth";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import AboutUs from "./AboutUs";
import DevInfo from "./DevInfo";
import SizingGuide from "./SizingGuide";
import Profile from "./Profile";
import Contact from "./Contact";
import Shop from "./Shop";
import Product from "./Product";
import CartPage from "./CartPage";
import OrderPage from "./OrderPage";
import ProductForm from "./ProductForm";
import OrderSuccessPage from "./OrderSuccessPage"; // Import OrderSuccessPage
import NailSizeOptions from "./NailSizeOptions";
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import StripeCheckoutForm from './StripeCheckoutForm';
import CheckoutFormComponent from './CheckoutFormComponent';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/nail-size-options" element={<NailSizeOptions />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/devinfo" element={<DevInfo />} />
          <Route path="/sizing-guide" element={<SizingGuide />} />
          <Route path="/profile" element={<ProfileWithUserId />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/create-checkout-session/:orderId" element={<StripeCheckoutForm />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/:orderId" element={<OrderPage />} />
          <Route path="/productform" element={<ProductForm />} />
          <Route path="/checkoutformcomponent" element={<CheckoutFormComponent />} />
          <Route path="/ordersuccesspage/:orderId" element={<OrderSuccessPage />} /> {/* Ensure this route is added */}
          <Route path="/product/read/:productId" element={<Product />} />
          <Route path="/checkout/:orderId" element={<Checkout />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/terms-of-service" element={<TermsOfService/>} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

const ProfileWithUserId = () => {
  const { userId } = useAuth();
  return <Profile userId={userId} />;
};

const Checkout = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const token = localStorage.getItem('token');

  const initiateCheckout = useCallback(async () => {
    try {
      const response = await fetch(`${backendUrl}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ order_id: orderId }),
      });

      const session = await response.json();
      if (session.error) {
        console.error('Error creating checkout session:', session.error);
      } else {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [orderId, token]);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted
    let abortController; // Store the AbortController instance

    const fetchOrder = async () => {
      try {
        abortController = new AbortController(); // Create a new AbortController

        const token = localStorage.getItem('token');
        const response = await fetch(`${backendUrl}/order/read/${orderId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          signal: abortController.signal // Pass the signal to the fetch request
        });
        const data = await response.json();

        if (isMounted) {
          setOrder(data);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching order:', error);
        }
      }
    };

    const cleanup = () => {
      isMounted = false; // Set isMounted to false when the component unmounts
      abortController?.abort(); // Abort any pending requests
    };

    fetchOrder();
    return cleanup;
  }, [orderId, token]);

  useEffect(() => {
    if (order) {
      initiateCheckout();
    }
  }, [order, initiateCheckout]);

  return order ? (
    <StripeCheckoutForm
      orderId={orderId}
      order={order}
    />
  ) : null;
};


export default App;
