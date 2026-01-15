# Student Notice Board System

This project consists of a frontend (HTML/CSS/JS) and a backend (Node.js/Express).

## Features
- **Admin Portal**: Post notices (images/PDFs), delete notices, and view student login history.
- **Student Board**: View notices filtered by department and download documents.
- **Backend**: Data is stored in a `data.json` file on the server.

## Setup & Running

### 1. Start the Backend
Navigate to the `backend` folder and start the server:
```bash
cd backend
npm install
node server.js
```
The backend will run on `http://localhost:5000`.

### 2. Open the Frontend
Open `index.html` in your browser.
- **Student Login**: Enter any name and select a department to see the notices.
- **Admin Portal**: Click the "Admin Portal" link and enter the password `admin123`.

## File Structure
- `admin.html`: Administrator dashboard.
- `board.html`: Student notice board.
- `index.html`: Student login page.
- `script.js`: Frontend logic (fetches data from backend).
- `backend/server.js`: Express server with API endpoints.
- `backend/data.json`: Database file (created automatically).
