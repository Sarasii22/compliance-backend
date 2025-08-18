# AI Compliance Monitoring System

## Overview
Automates regulatory compliance with AI (mocked). Scans regulations, maps to processes, detects gaps, generates reports.

## Features
- AI Regulation Scanner (mocked).
- Real-time alerts.
- Audit-ready PDF reports.
- Multi-country support (Singapore, Sri Lanka, EU).
- React frontend, Ballerina backend.

## Setup
1. **Backend**:
   - Install Ballerina: https://ballerina.io/downloads/
   - In `compliance-backend`, run `bal run`.
   - API: `http://localhost:9090`.
2. **Frontend**:
   - In `compliance-frontend`, run `npm install` and `npm start`.
   - Access: `http://localhost:3000`.

## Demo
- Go to `/demo`, select country, upload PDF, scan.
- View results, charts, alerts, generate PDF report.

## Future Enhancements
- Real AI (e.g., Grok API for NLP).
- Database for scan history.
- PDF processing with Ballerina.