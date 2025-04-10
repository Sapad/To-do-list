# 📝 To-Do List App (React + Express + MySQL)

A simple full-stack To-Do List application built using React for the frontend, Express.js for the backend, and MySQL for the database.

## 🚀 Features

- Add new to-do items
- Mark items as completed
- Delete items
- Data stored in MySQL database
- Clean and minimal UI

## 🛠️ Tech Stack

- **Frontend**: React
- **Backend**: Express.js
- **Database**: MySQL
- **Others**: body-parser, CORS


---

## 📦 Installation

### 1. Clone the repo
```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app

```

### 2.  Set up MySQL
```bash
CREATE DATABASE todo_app;

USE todo_app;

CREATE TABLE todo_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(255),
  completed BOOLEAN DEFAULT FALSE
);
```
### 3. Run the Backend
```bash
cd server
npm install
node server.js
```
### 4. Run the Frontend
```bash
cd client
npm install
npm start
```

App will run on: http://localhost:3000
Backend API: http://localhost:3002
