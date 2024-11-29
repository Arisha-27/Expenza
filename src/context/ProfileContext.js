import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState('');

  return (
    <ProfileContext.Provider value={{ userName, setUserName, profilePic, setProfilePic }}>
      {children}
    </ProfileContext.Provider>
  );
};
