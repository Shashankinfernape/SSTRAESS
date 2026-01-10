[README.md](https://github.com/user-attachments/files/23142378/README.md)
<div align="center">

<span style="color: #E50914; font-family: 'Bebas Neue', sans-serif; font-size: 3em; letter-spacing: 0.1em;">SSTRAESS</span>

Shashank Suresh Token Refresh & Expiry Selvaganapathy Sarathy

A robust foundation for modern web applications requiring secure, persistent user sessions using JWT authentication with automatic refresh.

 <!-- Replace with your actual Vercel project status badge if available -->
 <!-- Replace with your actual Render project status badge if available -->


</div>

Live Demo: sstraess.vercel.app

Backend API: sstraess.onrender.com

(Replace the placeholder above with a cool screenshot or GIF of your application)

✨ Features

🎬 Cinematic UI: Modern, dark-themed interface built with Tailwind CSS and Framer Motion for smooth animations, inspired by premium streaming services.

🔐 Secure JWT Authentication: Robust signup and login functionality using JSON Web Tokens. Passwords securely hashed with bcrypt.

🔄 Automatic Token Refresh: Seamless user experience with automatic access token renewal using HttpOnly refresh token cookies and Axios interceptors. No annoying logouts!

🛡️ Protected Routes: Backend middleware ensures only authenticated users can access sensitive API endpoints (like user profiles).

🚀 Modern Stack: Built with React (Vite) on the frontend and Node.js/Express on the backend, leveraging MongoDB Atlas for data persistence.

🌐 Decoupled Deployment: Frontend hosted on Vercel, Backend hosted on Render for scalability and clear separation of concerns.

🔧 Environment Configuration: Securely manages API keys, secrets, and database URIs using .env files.

👥 Creator Showcase: Interactive section on the landing page highlighting the development team.

🛠️ Tech Stack

Category

Technology

Frontend

React, Vite, Tailwind CSS, Framer Motion, React Router, Axios, jwt-decode, Lucide React

Backend

Node.js, Express.js, MongoDB Atlas, Mongoose, jsonwebtoken, bcrypt, cookie-parser, cors

Database

MongoDB (Cloud via MongoDB Atlas)

Deployment

Vercel (Frontend), Render (Backend)

📂 Project Structure

This project follows a monorepo structure, containing both the frontend and backend codebases in separate directories:

.
├── Backend/          # Node.js/Express API Server
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js   # Main server entry point
│   ├── .env            # Backend environment variables (SECRET!)
│   └── package.json
│
└── Frontend/         # React/Vite Client Application
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── lib/          # Contains axios config (api.js)
    │   ├── pages/
    │   ├── styles/
    │   └── main.jsx      # Main application entry point
    ├── .env            # Frontend environment variables
    └── package.json


🚀 Getting Started

Follow these steps to set up and run the project locally.

Prerequisites

Node.js (v18 or later recommended)

npm (comes with Node.js)

A MongoDB Atlas account (free tier available)

Installation & Setup

Clone the Repository:

git clone [https://github.com/Shashankinfernape/SSTRAESS.git](https://github.com/Shashankinfernape/SSTRAESS.git)
cd SSTRAESS


Setup Backend:

Navigate to the backend directory:

cd Backend


Install dependencies:

npm install


Create a .env file in the Backend directory. Copy the contents from your working local .env file or use the template below:

# Server Port
PORT=5000

# Node Environment (development or production)
NODE_ENV=development

# Frontend URL for Local CORS
FRONTEND_URL=http://localhost:5173

# MongoDB Connection String (Replace with yours)
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

# JWT Secrets (Generate strong random strings!)
JWT_SECRET=YOUR_VERY_STRONG_JWT_SECRET_KEY
REFRESH_SECRET=YOUR_OTHER_VERY_STRONG_REFRESH_SECRET_KEY


(Important: Replace placeholders with your actual MongoDB Atlas connection string and generate strong, unique secrets for JWT.)

Setup Frontend:

Navigate to the frontend directory:

cd ../Frontend


Install dependencies:

npm install


Create a .env file in the Frontend directory with the following variable (pointing to your local backend):

VITE_API_URL=http://localhost:5000/api


Running Locally

Start Backend Server:

Open a terminal in the Backend directory.

Run: node src/server.js

(The server should start on the port defined in .env, likely 5000)

Start Frontend Dev Server:

Open a separate terminal in the Frontend directory.

Run: npm run dev

Open your browser to http://localhost:5173 (or the port Vite indicates).

⚙️ Environment Variables

Ensure the following environment variables are correctly set for both local development (.env files) and deployment (Render/Vercel dashboards).

Backend (.env in Backend/ directory & on Render)

PORT: Port the backend server listens on (e.g., 5000 locally, Render sets this automatically).

NODE_ENV: Set to development or production.

MONGO_URI: Your full MongoDB Atlas connection string.

JWT_SECRET: A long, random, secret string for signing access tokens.

REFRESH_SECRET: A different long, random, secret string for signing refresh tokens.

CORS_ORIGIN: Comma-separated list of allowed frontend URLs (e.g., http://localhost:5173,https://your-vercel-url.vercel.app). Required on Render.

Frontend (.env in Frontend/ directory & on Vercel)

VITE_API_URL: The full base URL of your deployed backend API (e.g., https://your-backend.onrender.com/api). Required on Vercel.

☁️ Deployment

Backend: Deployed on Render as a Web Service. Ensure the Root Directory is set to Backend and all required environment variables are configured.

Frontend: Deployed on Vercel. Ensure the Root Directory is set to Frontend and the VITE_API_URL environment variable points to the live Render backend URL.

📄 License

This project is licensed under the MIT License - see the LICENSE file for details (if you add one).

✨ Creators

Shashank S

Sarathy

Suresh

Selvaganapathy

Sunil

(Feel free to add GitHub profile links or other details)
