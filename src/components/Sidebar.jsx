import React, { useContext } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import { FaHome, FaChartBar, FaHistory, FaCog, FaPhoneAlt, FaSignOutAlt } from 'react-icons/fa'; // Importing professional icons
import './Sidebar.css';

const Sidebar = ({ onSelect, selectedSection }) => {
  const { profilePic, userName } = useContext(ProfileContext); // Access profile context

  return (
    <div className="sidebar">
      {/* Sidebar Header with website name */}
      <div className="sidebar-header">
        <h2>Expenza</h2>
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        <img
          src={profilePic || 'https://via.placeholder.com/80'} // Default image if no profile picture
          alt="Profile"
          className="sidebar-profile-pic"
        />
        <h4>{userName || 'User'}</h4>
      </div>

      {/* Sidebar Menu */}
      <ul className="sidebar-menu">
        <li className={selectedSection === 'Home' ? 'active' : ''} onClick={() => onSelect('Home')}>
          <FaHome /> Dashboard
        </li>
        <li className={selectedSection === 'History' ? 'active' : ''} onClick={() => onSelect('History')}>
          <FaHistory /> History
        </li>
        <li className={selectedSection === 'Graphs' ? 'active' : ''} onClick={() => onSelect('Graphs')}>
          <FaChartBar /> Graphs
        </li>
        <li className={selectedSection === 'Settings' ? 'active' : ''} onClick={() => onSelect('Settings')}>
          <FaCog /> Settings
        </li>
        <li className={selectedSection === 'Contact Us' ? 'active' : ''} onClick={() => onSelect('Contact Us')}>
          <FaPhoneAlt /> Contact Us
        </li>
        <li className={selectedSection === 'Logout' ? 'active' : ''} onClick={() => onSelect('Logout')}>
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
