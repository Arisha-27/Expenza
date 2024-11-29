// src/contexts/UserContext.js

import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create a provider for the context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'John Doe', profilePic: null });

  // You can update the user profile here
  const updateUser = (newUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newUserData,
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
