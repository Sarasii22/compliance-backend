import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
//import BalLogo from '../assests/ballerina-logo.png';

function Home() {
  return (
    <div>
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Stay Compliant, Stay Ahead – AI-Powered Real-Time Compliance Monitoring</h1>
        <p>Automatically track regulations, map to your processes, and get instant alerts.</p>
        <Link to="/demo"><button className="cta-button">Try Live Demo</button></Link>
        
      </motion.section>
      <section className="how-it-works">
        <motion.div
          className="step"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Step 1: Scan</h2>
          <p>NLP scans legal documents for rules.</p>
        </motion.div>
        <motion.div
          className="step"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2>Step 2: Compare</h2>
          <p>ML matches rules to your operations.</p>
        </motion.div>
        <motion.div
          className="step"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2>Step 3: Alert</h2>
          <p>Instant notifications and updates.</p>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;