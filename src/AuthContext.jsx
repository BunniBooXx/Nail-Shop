import React, { createContext, useState, useEffect } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? JSON.parse(storedUserId) : null;
  });

  const login = (id) => {
    setUserId(id);
    localStorage.setItem('userId', JSON.stringify(id));
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${backendUrl}/app/user/logout`, {
        method: 'DELETE',
        headers: {
          Authorization: token
        }
      });

      if (response.ok) {
        console.log('Logout successful');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUserId(null);
      } else {
        console.error('Logout failed:', response.status);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${backendUrl}/app/user`, {
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
          setUserId(data.userId);
          console.log('UserId:', data.userId);
        } else {
          console.error('Failed to fetch userId:', data.message);
        }
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };

    if (userId == null) {
      fetchUserId();
    }
  }, [userId]);

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };





