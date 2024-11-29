import React, { useContext, useState } from 'react';
import './Settings.css';
import { ProfileContext } from '../context/ProfileContext';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

function Settings({ resetData, toggleTheme, setBudget, setNotificationsEnabled }) {
  const { userName, setUserName, profilePic, setProfilePic } = useContext(ProfileContext);
  const [localUserName, setLocalUserName] = useState(userName);
  const [localProfilePic, setLocalProfilePic] = useState(profilePic);
  const [localBudget, setLocalBudget] = useState('');
  const [localNotificationsEnabled, setLocalNotificationsEnabled] = useState(false);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalProfilePic(reader.result);
        setProfilePic(reader.result); // Update context
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserNameChange = (e) => {
    setLocalUserName(e.target.value);
    setUserName(e.target.value); // Update context
  };

  const handleBudgetChange = (e) => {
    setLocalBudget(e.target.value); // Update local budget value
  };

  const handleNotificationsToggle = () => {
    const newNotificationsEnabled = !localNotificationsEnabled;
    setLocalNotificationsEnabled(newNotificationsEnabled);
    setNotificationsEnabled(newNotificationsEnabled); // Update parent state
  };

  const handleSaveSettings = () => {
    // Save the budget by passing the local budget value to the parent state
    if (localBudget > 0) {
      setBudget(localBudget); // Update the budget in the parent (App)
    } else {
      alert('Please enter a valid budget');
    }
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="settings-container">
        {/* Profile Edit Section */}
        <div className="profile-edit">
          <h3>Edit Profile</h3>
          <img
            src={localProfilePic || 'https://via.placeholder.com/120'}
            alt="Profile"
            className="profile-pic"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
          />
          <input
            type="text"
            value={localUserName}
            onChange={handleUserNameChange}
            placeholder="Enter your name"
          />
        </div>

        {/* Theme Toggle Section */}
        <div className="settings-option">
          <h3>Theme</h3>
          <button onClick={toggleTheme}>Switch Theme</button>
        </div>

        {/* Reset Data Section */}
        <div className="settings-option">
          <h3>Reset</h3>
          <button onClick={resetData}>Reset Data</button>
        </div>

        {/* Budget Section */}
        <div className="settings-option">
          <h3>Set Budget</h3>
          <input
            type="number"
            placeholder="Enter your budget"
            value={localBudget}
            onChange={handleBudgetChange}
          />
        </div>

        {/* Notifications Section */}
        <div className="settings-option">
          <h3>Notifications</h3>
          <label className="settings-switch">
            <input
              type="checkbox"
              checked={localNotificationsEnabled}
              onChange={handleNotificationsToggle}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* Save Settings */}
        <div className="settings-option">
          <button onClick={handleSaveSettings}>Save Settings</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
