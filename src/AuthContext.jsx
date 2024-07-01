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
      const response = await fetch(`${backendUrl}/user/logout`, {
        method: 'DELETE',
        headers: {
          Authorization: token
        }
      });

      if (response.ok) {
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
        const response = await fetch(`${backendUrl}/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUserId(data.user_id);
        } else {
          console.error('Failed to fetch userId:', data.message);
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




