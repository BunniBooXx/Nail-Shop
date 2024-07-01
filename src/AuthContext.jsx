import React, { createContext, useState, useEffect } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? JSON.parse(storedUserId) : null;
  });

  const login = async (username, password) => {
    try {
      const response = await fetch(`${backendUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        setUserId(username);  // You may need to fetch and set the actual user ID here
        localStorage.setItem('userId', JSON.stringify(username));
      } else {
        console.error('Login failed:', response.status);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const fetchNewAccessToken = async () => {
    try {
      const response = await fetch(`${backendUrl}/user/refresh`, {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
      } else {
        console.error('Failed to refresh token:', response.status);
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUserId(null);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${backendUrl}/user/fetch/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setUserId(data.user_id);
        } else if (response.status === 401) {
          // Token might be expired, try to refresh it
          await fetchNewAccessToken();
        } else {
          console.error('Failed to fetch userId:', response.status);
        }
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };

    if (userId === null) {
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






