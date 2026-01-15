# TSDS Portal - Student Notice Board System

A comprehensive web application for managing and viewing campus notices, built with Node.js and Vanilla JS.

---

## 🚀 Overview
TSDS Portal is a dual-portal system designed to streamline communication between campus administration and students. It features a secure admin dashboard for broadcasting notices and a dynamic student board for viewing and downloading important documents.

## 📁 Project Structure
```text
TSDS-Portal/
├── backend/            # Express.js Server
│   ├── server.js       # Main server logic & API
│   ├── data.json       # JSON persistence store
│   └── vercel.json     # Vercel deployment config
└── frontend/           # Vanilla JS Frontend
    ├── index.html      # Student Login Page
    ├── board.html      # Student Notice Board
    ├── admin.html      # Administrator Dashboard
    ├── script.js       # Frontend Logic
    └── style.css       # Premium Styling
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation & Run
1. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```
   The backend will start on `http://localhost:5001`.

2. **Launch Frontend**
   - Open `frontend/index.html` in any modern web browser.

---

## ✨ Key Features

### 👤 Student Side
- **Authenticated Access**: Students log in with their name and department.
- **Dynamic Board**: View notices specific to their department or general "ALL" notices.
- **Document Support**: Preview and download Images or PDFs directly from the board.

### 🔐 Admin Side
- **Secure Access**: Password-protected dashboard (`admin123`).
- **Notice Management**: Upload, preview, and delete notices.
- **Student Analytics**: View student login history and department distribution.

---

## 🛠️ Technical Architecture

### System Flow
1. **Frontend**: The client application is server-side agnostic and communicates with the Backend via standard REST APIs.
2. **Backend**: A Node.js Express server handles routing, logic, and data management.
3. **Data Storage**: The system uses a JSON file (`data.json`) for persistent storage.

### Data Persistence (Vercel/Serverless)
Since Vercel's filesystem is read-only at runtime, this project uses **Memory Caching**:
- When data is written, it is saved to an internal `memoryCache`.
- Subsequent reads check the cache first.
- *Note*: Data is volatile and resets if the serverless function restarts.

---

## 📡 API Reference

### 1. Notices
- `GET /api/notices`: Get all notices.
- `POST /api/notices`: Create a new notice (requires `title`, `dept`, `data`, `type`).
- `DELETE /api/notices/:id`: Remove a notice.

### 2. Students
- `GET /api/students`: Get student login history.
- `POST /api/students`: Log a student entry (requires `name`, `dept`).

---

## 🎨 Frontend Guide
- **Stack**: Vanilla JS, Bootstrap 5, Poppins Font.
- **Logic**: All interactions are handled in `script.js`.
- **Styling**: Premium Emerald theme with Glassmorphism effects in `style.css`.

---

## 📄 License
MIT License
