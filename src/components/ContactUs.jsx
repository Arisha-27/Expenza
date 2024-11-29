// src/components/ContactUs.jsx
import React, { useState, seContext } from 'react';
import './ContactUs.css';

import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext


function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Corrected string interpolation
    alert(`Message Sent:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
  };

  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
          />
        </label>
        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message"
            required
          ></textarea>
        </label>
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
}

export default ContactUs;
