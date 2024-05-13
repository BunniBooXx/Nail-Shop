import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./useAuth";
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

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleCheckout = async (product) => {
    setIsLoading(true);
    try {
      const response = await fetch("/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product }),
      });

      const session = await response.json();
      if (response.ok) {
        window.location.href = session.url;
      } else {
        console.error("Error creating checkout session:", session.error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      {products.map((product) => (
        <div key={product.id} className="product">
          <img src={product.imageUrl} alt={product.name} />
          <div className="description">
            <h3>{product.name}</h3>
            <h5>${product.price}</h5>
          </div>
          <button
            onClick={() => handleCheckout(product)}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Checkout"}
          </button>
        </div>
      ))}
    </section>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/devinfo" element={<DevInfo />} />
          <Route path="/sizing-guide" element={<SizingGuide />} />
          <Route path="/profile" element={<ProfileWithUserId />} />
          <Route path="/contact" element={<Contact />} />
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
  const initiateCheckout = async () => {
    try {
      const response = await fetch("/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Add product details if required
        }),
      });

      const session = await response.json();
      window.location.href = session.url;
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  initiateCheckout();

  return null;
};

export default App;
