import React from 'react';
import { motion } from 'framer-motion';

function UseCases() {
  return (
    <motion.div
      className="use-cases"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Use Cases</h1>
      <div className="use-case-item">
        <h2>Sri Lankan Fintech with AML Laws</h2>
        <p>A fintech operating in multiple countries tracks AML laws. If Singapore updates KYC, get instant alerts and workflow updates.</p>
      </div>
      <div className="use-case-item">
        <h2>Multi-Country Healthcare Compliance</h2>
        <p>Monitor health data regulations across regions to avoid violations.</p>
      </div>
      <div className="use-case-item">
        <h2>GDPR Data Protection Monitoring</h2>
        <p>Ensure EU data privacy rules are mapped to company practices in real-time.</p>
      </div>
    </motion.div>
  );
}

export default UseCases;