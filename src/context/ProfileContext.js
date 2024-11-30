// ProfileContext.js

import React, { createContext, useContext, useState } from 'react';

// Create ProfileContext
export const ProfileContext = createContext();

// Create a custom hook to use the ProfileContext
export const useProfile = () => useContext(ProfileContext);

// Create ProfileProvider to wrap the app with context
export const ProfileProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState('');

  return (
    <ProfileContext.Provider value={{ userName, setUserName, profilePic, setProfilePic }}>
      {children}
    </ProfileContext.Provider>
  );
};
