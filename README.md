# 💬 Chat App with Whiteboard ✏️

![Last Commit](https://img.shields.io/github/last-commit/Spaghetoz/chat-app?style=flat-square)
![Commits](https://img.shields.io/github/commit-activity/m/Spaghetoz/chat-app?style=flat-square)
[![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](#)
[![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](#)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](#)

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
2. And similarly, start the frontend using Docker compose: `docker-compose up --build`

And open the web app on your browser at http://localhost:5173
