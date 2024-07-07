import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
import defaultAvatarImage from './images/default-avatar-image.jpg';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Navbar = () => {
  const [cartData, setCartData] = useState({ items: [], total_price: 0 });
  const [avatarImage, setAvatarImage] = useState(defaultAvatarImage);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setUserId(null);
    navigate('/login');
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    
    console.log('storedUserId:', storedUserId); // Debugging line

    if (storedUserId && token) {
      const numericUserId = Number(storedUserId); // Ensure userId is converted to a number
      console.log('numericUserId:', numericUserId); // Debugging line
      setUserId(numericUserId);
      fetchCart(token);
      fetchUserData(numericUserId, token);
    }
  }, []);

  const fetchCart = async (token) => {
    try {
      const response = await axios.get(`${backendUrl}/cart/read`, {
        headers: {
          'Authorization': token,
        },
      });
      setCartData(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchUserData = async (userId, token) => {
    try {
      const response = await fetch(`${backendUrl}/user/fetch/${userId}`, {
        headers: {
          'Authorization': token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const avatarImagePath = data.avatar_image ? `/${data.avatar_image}` : defaultAvatarImage;
        setAvatarImage(avatarImagePath);
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch user data:', errorText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Bunny Bubbles Nails</Link>
      </div>
      <div className="relative">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {avatarImage ? (
                <img alt="User Avatar" src={avatarImage} />
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><Link to="/sizing-guide">Sizing Guide</Link></li>
            {userId ? (
              <li><button className="btn btn-ghost" onClick={logout}>Logout</button></li>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            )}
            <li><Link to="/shop">Shop</Link></li>
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-ghost">
            <Link to="/cart">Cart</Link>
          </div>
          <div className="absolute mt-3 z-50 card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">{cartData.items.length} Items</span>
              <span className="text-info">Subtotal: ${cartData.total_price}</span>
              <div className="card-actions">
                <Link to="/cart" className="btn btn-primary-content">View cart</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;



