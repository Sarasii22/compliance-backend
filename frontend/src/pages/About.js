import React, { useState } from 'react';
import { motion } from 'framer-motion';

function About() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:9090/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        alert('Error sending message. Please try again. (Status: ' + response.status + ')');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <motion.div
      className="about-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>About Us</h1>
      <p>We are a team building AI solutions for compliance to help companies stay ahead of regulations.</p>
      <p>Why we built it: Manual tracking is inefficient—AI makes it seamless.</p>
      <div>
        <h2>Powered by Ballerina</h2>
        <p>Our backend (coming soon) leverages Ballerina for seamless API integrations, real-time event-driven alerts, and scalable compliance processing.</p>
      </div>
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} aria-label="Contact form">
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required aria-required="true" />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required aria-required="true" />
          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required aria-required="true" />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </motion.div>
  );
}

export default About;