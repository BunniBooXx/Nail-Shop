import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useAuth } from './useAuth';

const Profile = () => {
  const { userId } = useAuth(); // Retrieve userId from the authentication context
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatar_image, setAvatar] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userId) { 
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
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
      }
    };
  
    fetchUser();
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

  const updateUser = async (updateType) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/user/update/${userId}/${updateType}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ 
          [updateType]: updateType === 'avatar' ? avatar_image : updateType === 'username' ? username : updateType === 'password' ? password : email 
        }),
      });
      const data = await response.json();
      console.log('Response:', data);
      if (response.ok) {
        setMessage(`Successfully updated ${updateType}`);
      } else {
        setMessage(`Failed to update ${updateType}`);
      }
    } catch (error) {
      console.error('Error in updating:', error);
      setMessage(`Error in updating ${updateType}`);
    }
  };

  const updateUsername = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/user/update/${userId}/username`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      console.log('Response:', data);
      if (response.ok) {
        setMessage('Username updated successfully');
      } else {
        setMessage('Failed to update username');
      }
    } catch (error) {
      console.error('Error in updating username:', error);
      setMessage('Error in updating username');
    }
  };

  const updatePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/user/update/${userId}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      console.log('Response:', data);
      if (response.ok) {
        setMessage('Password updated successfully');
      } else {
        setMessage('Failed to update password');
      }
    } catch (error) {
      console.error('Error in updating password:', error);
      setMessage('Error in updating password');
    }
  };

  const updateEmail = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/user/update/${userId}/email`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log('Response:', data);
      if (response.ok) {
        setMessage('Email updated successfully');
      } else {
        setMessage('Failed to update email');
      }
    } catch (error) {
      console.error('Error in updating email:', error);
      setMessage('Error in updating email');
    }
  };

  const updateAvatar = async (imagePath) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/user/update/${userId}/avatar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ avatar_image: imagePath }),
      });
      const data = await response.json();
      console.log('Response:', data);
      if (response.ok) {
        setMessage('Avatar updated successfully');
      } else {
        setMessage('Failed to update avatar');
      }
    } catch (error) {
      console.error('Error in updating avatar:', error);
      setMessage('Error in updating avatar');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="avatar-section">
        <h2 className="section-title">Choose Your Avatar</h2>
        <div className="avatar-selection">
  <img
    src="./blonde_heart_avatar.png"
    alt="Avatar 2"
    className="avatar"
    onClick={() => updateAvatar("./blonde_heart_avatar.png")}
  />
  <img
    src="./brown_avatar.png"
    alt="Avatar 3"
    className="avatar"
    onClick={() => updateAvatar("./brown_avatar.png")}
  />
  <img
    src="./purple-hair.png"
    alt="Avatar 7"
    className="avatar"
    onClick={() => updateAvatar("./purple-hair.png")}
  />
  <img
    src="./green_eye_avatar.jpg"
    alt="Avatar 4"
    className="avatar"
    onClick={() => updateAvatar("./green_eye_avatar.jpg")}
  />
  <img
    src="./pink-tan.png"
    alt="Avatar 7"
    className="avatar"
    onClick={() => updateAvatar("./pink-tan.png")}
  />
  <img
    src="./black_avatar.png"
    alt="Avatar 5"
    className="avatar"
    onClick={() => updateAvatar("./black_avatar.png")}
  />
  <img
    src="./red_avatar.png"
    alt="Avatar 6"
    className="avatar"
    onClick={() => updateAvatar("./red_avatar.png")}
  />
  <img
    src="./blonde_avatar.png"
    alt="Avatar 7"
    className="avatar"
    onClick={() => updateAvatar("./blonde_avatar.png")}
  />
</div>
<button onClick={updateAvatar} className="button">Save Avatar</button>

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

      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Profile;
