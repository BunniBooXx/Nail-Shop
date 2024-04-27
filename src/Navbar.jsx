import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from './useAuth';

const Navbar = () => {
  const { userId, logout } = useAuth();

  // Function to get the avatar image URL based on the user's selected avatar
  const getAvatarImageUrl = () => {
    // Logic to determine the avatar image URL based on the user's selected avatar_image
    // Replace the logic below with your implementation
    if (userId) {
      // If user is logged in and has selected an avatar, return the corresponding image URL
      // Example: return `/avatars/${userId}.jpg`;
      return '/avatar.jpg'; // Placeholder URL, replace with your logic
    } else {
      // If user is not logged in or hasn't selected an avatar, return default image URL
      return '/logo.jpg'; // Placeholder URL, replace with your default avatar URL
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
              <img alt="User Avatar" src={getAvatarImageUrl()} /> {/* Dynamically set avatar image */}
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
              <li><button onClick={logout}>Logout</button></li>
            ) : (
              <>
                <li><button onClick={logout}>Logout</button></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            )}
            <li><Link to="/shop">Shop</Link></li>
          </ul>
        </div>
        {/* Cart dropdown content */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-ghost">
            <Link to="/cart">Cart</Link>
          </div>
          <div className="absolute mt-3 z-50 card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <Link to="/cart" className="btn btn-primary btn-block">View cart</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;


