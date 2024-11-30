import React, { useContext, useState } from 'react';
import './Settings.css';
import { ProfileContext } from '../context/ProfileContext';

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
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserNameChange = (e) => {
    setLocalUserName(e.target.value);
    setUserName(e.target.value);
  };

  const handleBudgetChange = (e) => {
    setLocalBudget(e.target.value);
  };

  const handleNotificationsToggle = () => {
    const newNotificationsEnabled = !localNotificationsEnabled;
    setLocalNotificationsEnabled(newNotificationsEnabled);
    setNotificationsEnabled(newNotificationsEnabled);
  };

  const handleSaveSettings = () => {
    if (localBudget > 0) {
      setBudget(localBudget);
      alert('Settings saved successfully!');
    } else {
      alert('Please enter a valid budget');
    }
  };

  return (
    <div className="settings">
      <h1>Account Settings</h1>
      <div className="settings-container">
        <div className="profile-edit">
          <h3>Profile</h3>
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

        <div className="settings-option">
          <h3>Theme</h3>
          <button onClick={toggleTheme}>Switch Theme</button>
        </div>

        <div className="settings-option">
          <h3>Set Monthly Budget</h3>
          <input
            type="number"
            placeholder="Enter your budget"
            value={localBudget}
            onChange={handleBudgetChange}
            min="0"
          />
        </div>

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

        <div className="settings-option">
          <h3>Reset Application</h3>
          <button onClick={resetData}>Reset Data</button>
        </div>

        <div className="settings-option">
          <button onClick={handleSaveSettings}>Save Settings</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;


