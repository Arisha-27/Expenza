import React, { useContext } from 'react';
import './Sidebar.css';
import { ProfileContext } from '../context/ProfileContext';

function Sidebar({ onSelect }) {
  const { userName, profilePic } = useContext(ProfileContext);

  const menuItems = [
    { name: 'Home', icon: '🏠' },
    { name: 'Graphs', icon: '📊' },
    { name: 'History', icon: '📜' },
    { name: 'Settings', icon: '⚙' },
    { name: 'Contact Us', icon: '📞' },
  ];

  return (
    <div className="sidebar">
      <div className="profile-section">
        <img
          src={profilePic || 'https://via.placeholder.com/100'}
          alt="Profile"
          className="profile-pic"
        />
        <p className="username">{userName || 'User Name'}</p>
      </div>
      <h2 className="sidebar-header">Menu</h2>
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="menu-item"
            onClick={() => onSelect(item.name)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
