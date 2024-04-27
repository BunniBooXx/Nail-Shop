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
          <Route path="/order" element={<OrderPage />} />
          <Route path="/productform" element={<ProductForm />} />
          <Route path="/ordersuccesspage" element={<OrderSuccessPage />} />

          {/* Route to render Product component for dynamic product routes */}
          <Route path="/product/read/:productId" element={<Product />} />
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

export default App;
