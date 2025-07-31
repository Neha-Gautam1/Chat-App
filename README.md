# 💬 Chat-App

A full-stack real-time chat application with authentication, user search, and persistent message storage using MongoDB.

---

## 🚀 Getting Started

Follow the steps below to set up both the frontend and backend.

---

## 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
After running the app, click on the URL shown in the terminal (usually http://localhost:5173) to open it in the browser.

⚙️ Backend Setup
bash
Copy
Edit
cd backend
npm install
npm start
Make sure your MongoDB server is running and accessible.

🔐 Environment Variables
Create your own .env files with the necessary environment variables.

📦 Backend .env Example
env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
⚠️ Be sure to replace placeholder values with your actual credentials.
Do NOT commit .env files to the repository.

✨ Features
🔐 Authentication

Register new users

Login with secure credentials

💬 Chat Functionality

Send and receive messages in real time

Messages are stored in MongoDB

🔍 User Search

Filter users in the search bar to start a chat

🧠 Persistent Storage

Chat history and user data saved in MongoDB

🛠️ Tech Stack
Frontend: React, Vite

Backend: Node.js, Express

Database: MongoDB, Mongoose

Authentication: JWT

🙋‍♀️ Author
GitHub: Neha-Gautam1


