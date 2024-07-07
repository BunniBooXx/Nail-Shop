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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = `Bearer ${data.access_token}`;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('userId', data.user_id.toString()); // Store the user ID as a string
        setUserId(data.user_id); // Set the userId in the state
        return { success: true };
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        return { success: false };
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return { success: false };
    }
  };

  const fetchNewAccessToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || token === 'null') {
        console.error('Token is null or invalid');
        return;
      }
      console.log('fetchNewAccessToken - Token before request:', token);
      const response = await fetch(`${backendUrl}/user/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        const newToken = `Bearer ${data.access_token}`;
        console.log('New access token:', newToken);
        localStorage.setItem('token', newToken);
      } else {
        console.error('Failed to refresh token:', await response.json());
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUserId(null);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || token === 'null') {
          console.error('Token is null or invalid');
          return;
        }

        const response = await fetch(`${backendUrl}/user/fetch/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setUserId(data.user_id); // Ensure the correct user ID is set from the response
        } else if (response.status === 401) {
          console.warn('Token might be expired, trying to refresh it');
          await fetchNewAccessToken();
          const newToken = localStorage.getItem('token');
          const retryResponse = await fetch(`${backendUrl}/user/fetch/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': newToken,
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });
          if (retryResponse.ok) {
            const retryData = await retryResponse.json();
            setUserId(retryData.user_id); // Ensure the correct user ID is set from the response
          } else {
            console.error('Failed to fetch userId after token refresh:', retryResponse.status);
          }
        } else {
          console.error('Failed to fetch userId:', await response.json());
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



