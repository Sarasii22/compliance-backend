import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { jsPDF } from 'jspdf';
import regulations from '../data/regulations.json';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

ChartJS.register(ArcElement, Tooltip, Legend);
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

function Demo() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [country, setCountry] = useState('Singapore');
  const [scanResults, setScanResults] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleScan = async () => {
    if (!file) {
      setError('Please upload a PDF file.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      // Mock Ballerina API call
      // In real app: const response = await fetch('http://your-ballerina-api/scan', { method: 'POST', body: JSON.stringify({ file: file.name, country }) });
      // const data = await response.json();
      // setScanResults(data.results);
      // setAlerts(data.alerts);

      // Simulated response using mock data
      const mockResults = regulations[country] || [];
      setScanResults(mockResults);
      setAlerts([`Alert: New ${country} regulation detected.`]);
    } catch (err) {
      setError('Scan failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.text('Audit Report', 10, 10);
    doc.text(`Country: ${country}`, 10, 20);
    scanResults.forEach((result, index) => {
      doc.text(`${index + 1}. ${result.rule} - ${result.status} (Process: ${result.process})`, 10, 30 + index * 10);
    });
    doc.save('audit-report.pdf');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts((prev) => [...prev, `New regulation detected at ${new Date().toLocaleTimeString()}`]);
    }, 10000); // Every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const compliantCount = scanResults.filter(r => r.status === 'Compliant').length;
  const nonCompliantCount = scanResults.length - compliantCount;
  const chartData = {
    labels: ['Compliant', 'Non-Compliant'],
    datasets: [{
      data: [compliantCount, nonCompliantCount],
      backgroundColor: ['#28a745', '#dc3545'],
      borderColor: ['#28a745', '#dc3545'],
      borderWidth: 1,
    }],
  };

  return (
    <motion.div
      className="demo-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Live Demo</h1>
      <div className="upload-section">
        <select value={country} onChange={handleCountryChange} style={{ marginRight: '10px' }}>
          <option value="Singapore">Singapore</option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="EU">EU</option>
        </select>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleScan} className="cta-button">Scan Regulation</button>
      </div>
      {error && <div className="alert" style={{ backgroundColor: '#dc3545' }}>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {file && (
        <div style={{ marginTop: '20px' }}>
          <h3>PDF Preview</h3>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={1} width={300} />
          </Document>
        </div>
      )}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2>Alerts</h2>
          {alerts.map((alert, index) => (
            <div key={index} className="alert">{alert}</div>
          ))}
        </motion.div>
      )}
      {scanResults.length > 0 && (
        <div className="results-section">
          <h2>Detected Rules & Compliance Status</h2>
          <table>
            <thead>
              <tr>
                <th>Rule</th>
                <th>Status</th>
                <th>Process</th>
              </tr>
            </thead>
            <tbody>
              {scanResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.rule}</td>
                  <td className={result.status === 'Compliant' ? 'status-green' : 'status-red'}>{result.status}</td>
                  <td>{result.process}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ maxWidth: '400px', margin: '20px auto' }}>
            <Pie data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Compliance Status' } } }} />
          </div>
          <button onClick={handleGenerateReport} className="cta-button" style={{ marginTop: '20px' }}>Generate Audit Report</button>
        </div>
      )}
    </motion.div>
  );
}

export default Demo;