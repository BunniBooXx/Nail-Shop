import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
import { useAuth } from './useAuth';
import defaultAvatarLoadingImage from './images/default-avatar-image.jpg';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const defaultAvatarImage = '/logo.jpg'; // This will refer to logo.jpg in the public folder

const Navbar = () => {
  const { userId, logout } = useAuth();
  const [cartData, setCartData] = useState({ items: [], total_price: 0 });
  const [avatarImage, setAvatarImage] = useState(defaultAvatarImage);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    console.log('storedUserId:', userId); // Debugging line

    if (userId && token) {
      setIsLoading(true); // Start loading
      fetchCart(token);
      fetchUserData(userId, token);
    } else {
      setAvatarImage(defaultAvatarImage); // Show default image if not logged in
    }
  }, [userId]);

  const fetchCart = async (token) => {
    try {
      const response = await axios.get(`${backendUrl}/cart/read`, {
        headers: {
          'Authorization': `Bearer ${token}`,
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
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('Fetched user data:', userData); // Debugging line
        setUser(userData);
        if (userData.avatar_image) {
          setAvatarImage(userData.avatar_image);
          console.log('Avatar image set to:', userData.avatar_image); // Debugging line
        } else {
          console.log('User does not have an avatar image'); // Debugging line
        }
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    if (updatedUser.avatar_image) {
      setAvatarImage(updatedUser.avatar_image);
      console.log('Avatar image updated to:', updatedUser.avatar_image); // Debugging line
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
              {isLoading ? (
                <img alt="Loading Avatar" src={defaultAvatarLoadingImage} />
              ) : (
                <img alt="User Avatar" src={avatarImage} />
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





