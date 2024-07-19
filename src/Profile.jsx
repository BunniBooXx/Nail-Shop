import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useAuth } from './useAuth';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Profile = () => {
  const { userId } = useAuth(); // Retrieve userId from the authentication context
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatar_image, setAvatar] = useState('');
  const [notification, setNotification] = useState({ type: '', message: '', show: false });

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const token = localStorage.getItem('token');
          console.log('token:', token); // Debugging line
          const response = await fetch(`${backendUrl}/user/fetch/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          console.log('Response status:', response.status);
          const data = await response.json();
          console.log('Data:', data);
          if (response.ok) {
            setUser(data);
            setUsername(data.username);
            setEmail(data.email);
            setAvatar(data.avatar_image);
          } else {
            console.error('Failed to fetch user details:', data.message);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const showNotification = (type, message) => {
    setNotification({ type, message, show: true });
    setTimeout(() => setNotification({ type: '', message: '', show: false }), 3000);
  };

  const updateUser = async (updateType) => {
    try {
      const token = localStorage.getItem('token');
      console.log('token:', token); // Debugging line
      const response = await fetch(`${backendUrl}/user/update/${userId}/${updateType}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          [updateType]: updateType === 'avatar' ? avatar_image : updateType === 'username' ? username : updateType === 'password' ? password : email
        }),
      });
      const data = await response.json();
      console.log('Response:', data);
      if (response.ok) {
        showNotification('success', `Successfully updated ${updateType}`);
      } else {
        showNotification('error', `Failed to update ${updateType}`);
      }
    } catch (error) {
      console.error('Error in updating:', error);
      showNotification('error', `Error in updating ${updateType}`);
    }
  };

  const updateUsername = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('token:', token); // Debugging line
      const response = await fetch(`${backendUrl}/user/update/${userId}/username`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      console.log('Response:', data);
      if (response.ok) {
        showNotification('success', 'Username updated successfully');
      } else {
        showNotification('error', 'Failed to update username');
      }
    } catch (error) {
      console.error('Error in updating username:', error);
      showNotification('error', 'Error in updating username');
    }
  };

  const updatePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('token:', token); // Debugging line
      const response = await fetch(`${backendUrl}/user/update/${userId}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      console.log('Response:', data);
      if (response.ok) {
        showNotification('success', 'Password updated successfully');
      } else {
        showNotification('error', 'Failed to update password');
      }
    } catch (error) {
      console.error('Error in updating password:', error);
      showNotification('error', 'Error in updating password');
    }
  };

  const updateEmail = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('token:', token); // Debugging line
      const response = await fetch(`${backendUrl}/user/update/${userId}/email`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log('Response:', data);
      if (response.ok) {
        showNotification('success', 'Email updated successfully');
      } else {
        showNotification('error', 'Failed to update email');
      }
    } catch (error) {
      console.error('Error in updating email:', error);
      showNotification('error', 'Error in updating email');
    }
  };

  const updateAvatar = async (imagePath) => {
    try {
      const token = localStorage.getItem('token');
      console.log('token:', token); // Debugging line
      const response = await fetch(`${backendUrl}/user/update/${userId}/avatar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ avatar_image: imagePath }),
      });
      const data = await response.json();
      console.log('Response:', data);
      if (response.ok) {
        showNotification('success', 'Avatar updated successfully');
      } else {
        showNotification('error', 'Failed to update avatar');
      }
    } catch (error) {
      console.error('Error in updating avatar:', error);
      showNotification('error', 'Error in updating avatar');
    }
  };

  if (!userId) {
    return (
      <div className="auth-prompt-wrapper">
        <div className="auth-prompt">
          <h2>Please sign up or log in to access your profile</h2>
          <div className="auth-links">
            <a href="/signup" className="auth-link">Sign Up</a>
            <a href="/login" className="auth-link">Log In</a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className={`notification ${notification.show ? 'show' : ''} ${notification.type}`}>
        {notification.message}
      </div>
      <div className="avatar-section">
        <h2 className="section-title">Choose Your Avatar</h2>
        <div className="avatar-selection">
          <img
            src="./blonde_heart_avatar.jpg"
            alt="Avatar 2"
            className="avatar"
            onClick={() => updateAvatar("./blonde_heart_avatar.jpg")}
          />
          <img
            src="./brown_avatar.jpg"
            alt="Avatar 3"
            className="avatar"
            onClick={() => updateAvatar("./brown_avatar.jpg")}
          />
          <img
            src="./purple-hair.jpg"
            alt="Avatar 7"
            className="avatar"
            onClick={() => updateAvatar("./purple-hair.jpg")}
          />
          <img
            src="./green_eye_avatar.jpg"
            alt="Avatar 4"
            className="avatar"
            onClick={() => updateAvatar("./green_eye_avatar.jpg")}
          />
          <img
            src="./pink-tan.jpg"
            alt="Avatar 7"
            className="avatar"
            onClick={() => updateAvatar("./pink-tan.jpg")}
          />
          <img
            src="./black_avatar.jpg"
            alt="Avatar 5"
            className="avatar"
            onClick={() => updateAvatar("./black_avatar.jpg")}
          />
          <img
            src="./red_avatar.jpg"
            alt="Avatar 6"
            className="avatar"
            onClick={() => updateAvatar("./red_avatar.jpg")}
          />
          <img
            src="./blue_eye_avatar.jpg"
            alt="Avatar 7"
            className="avatar"
            onClick={() => updateAvatar("./blonde_avatar.jpg")}
          />
        </div>
      </div>
      <div className="personal-info-section">
        <h2 className="section-title">Personal Information</h2>
        <div className="personal-info-form">
          <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
          <button onClick={updateUsername} className="button">Update Username</button>
          <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          <button onClick={updatePassword} className="button">Update Password</button>
          <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
          <button onClick={updateEmail} className="button">Update Email</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;


