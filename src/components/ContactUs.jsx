import React, { useState, useContext } from 'react';
import './ContactUs.css';
import { ThemeContext } from '../context/ThemeContext';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (!message.trim()) {
      errors.message = 'Message is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulated form submission
      alert(`Message Sent Successfully!\nName: ${name}\nEmail: ${email}`);

      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      setFormErrors({});
    }
  };

  return (
    <div className="contact-us">
      <h2>Contact Support</h2>
      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            {formErrors.name && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '14px' }}>{formErrors.name}</p>}
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
            />
            {formErrors.email && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '14px' }}>{formErrors.email}</p>}
          </label>

          <label>
            Message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here"
            ></textarea>
            {formErrors.message && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '14px' }}>{formErrors.message}</p>}
          </label>

          <button type="submit" className="send-button">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;