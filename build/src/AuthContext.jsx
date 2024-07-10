import React, { createContext, useState, useEffect } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem('userId');
    console.log('Initial stored userId:', storedUserId); // Debugging step
    return storedUserId ? parseInt(storedUserId, 10) : null;
  });

  const login = async (username, password) => {
    try {
      console.log('Attempting login with:', { username, password }); // Debugging step
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
        console.log('Login response data:', data); // Debugging step
        if (data.access_token && data.user_id) {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('userId', data.user_id);
          setUserId(data.user_id);
          console.log('User ID set in localStorage:', localStorage.getItem('userId')); // Debugging step
        } else {
          console.error('Login response missing access_token or user_id:', data);
        }
      } else {
        console.error('Login failed:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const fetchNewAccessToken = async () => {
    try {
      console.log('Attempting to refresh token'); // Debugging step
      const response = await fetch(`${backendUrl}/user/refresh`, {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        console.log('New token set in localStorage:', data.access_token); // Debugging step
      } else {
        console.error('Failed to refresh token:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  const logout = async () => {
    console.log('Logging out'); // Debugging step
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUserId(null);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }
        console.log('Fetching user ID with token:', token); // Debugging step
        const response = await fetch(`${backendUrl}/user/fetch/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}` // Ensure Bearer token format
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetch user data response:', data); // Debugging step
          if (data.user_id) {
            setUserId(data.user_id);
            localStorage.setItem('userId', data.user_id);
            console.log('User ID set in localStorage after fetch:', localStorage.getItem('userId')); // Debugging step
          } else {
            console.error('Fetch user data response missing user_id:', data);
          }
        } else if (response.status === 401) {
          // Token might be expired, try to refresh it
          await fetchNewAccessToken();
        } else {
          console.error('Failed to fetch userId:', response.status, await response.text());
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













