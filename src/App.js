import React, { useState, useEffect, useCallback } from "react";
import StripeCheckoutForm from './StripeCheckoutForm';
import CheckoutFormComponent from './CheckoutFormComponent';
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
import OrderSuccessPage from "./OrderSuccessPage";
import NailSizeOptions from "./NailSizeOptions";

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
          <Route path="/ordersuccesspage" element={<OrderSuccessPage />} />
          <Route path="/product/read/:productId" element={<Product />} />
          <Route path="/checkout/:orderId" element={<Checkout />} />
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

  const initiateCheckout = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({order_id: orderId}),

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
  }, [order]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/order/read/${orderId}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

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
