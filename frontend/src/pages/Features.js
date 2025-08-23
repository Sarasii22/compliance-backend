import React from 'react';
import { motion } from 'framer-motion';

function Features() {
  return (
    <motion.div
      className="features-list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Key Features</h1>
      <div className="feature-item">
        <h2>AI Regulation Scanner</h2>
        <p>Automatically reads and interprets new regulations from government sources.</p>
      </div>
      <div className="feature-item">
        <h2>Automated Mapping to Processes</h2>
        <p>Maps regulations to your internal processes and data usage.</p>
      </div>
      <div className="feature-item">
        <h2>Real-Time Alerts & Notifications</h2>
        <p>Alerts teams about gaps or violations instantly.</p>
      </div>
      <div className="feature-item">
        <h2>Audit-Ready Report Generation</h2>
        <p>Generates reports in seconds for audits.</p>
      </div>
      <div className="feature-item">
        <h2>Multi-Country, Multi-Industry Support</h2>
        <p>Scales for global operations across industries.</p>
      </div>
    </motion.div>
  );
}

export default Features;