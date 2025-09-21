# 💬 Chat App with Whiteboard ✏️

A real-time chat application built with Express, Socket.io, and React, featuring a collaborative whiteboard.

### Features

- Real-time chat 
- Collaborative whiteboard
- JWT Auth system

### Technologies Used

- Backend: **ExpressJS**, **Socket.io**, **PostgreSQL**
- Frontend: **React**, **Konva**
- Others: **Node.js**, **npm**, **vite**

## 🛠️ Installation

## Prerequisites
- Docker & Docker Compose
- Node.js & npm (for the frontend)

## Clone the repository:
```
git clone https://github.com/Spaghetoz/chat-app.git
cd chat-app
```
### Run the backend :
1. Navigate to the /server folder: `cd server`
2. Rename `.env.example` to `.env` and edit it with your configuration
3. And start the backend using Docker compose: `docker-compose up --build`

### Run the frontend :
1. Navigate to the /web folder: `cd web`
2. And similarly, start the frontend using Docker compose: `docker compose up --build`

And open the web app on your browser at http://localhost:5173
