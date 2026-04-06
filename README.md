# Kanban Board - MERN Stack

A simple Kanban board application built with MongoDB, Express, React, and Node.js.

## Features

- 4 columns: To Do, In Progress, Review, Done
- Create new tasks
- Move tasks between columns using dropdown
- Delete tasks
- Responsive design
- Real-time updates

## Project Structure

```
KanbanBoard/
├── client/          # React frontend
├── server/          # Node.js/Express backend
└── README.md        # This file
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (installed and running locally)
- npm or yarn

## Setup Instructions

### 1. Install MongoDB

Make sure MongoDB is installed and running on your machine:
- Windows: Download and install from [MongoDB官网](https://www.mongodb.com/try/download/community)
- Mac: `brew install mongodb-community && brew services start mongodb-community`
- Linux: Follow the official MongoDB installation guide

### 2. Install Dependencies

#### Backend Dependencies
```bash
cd server
npm install
```

#### Frontend Dependencies
```bash
cd client
npm install
```

### 3. Start the Application

#### Step 1: Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows (if installed as service)
net start MongoDB

# On Mac/Linux
brew services start mongodb-community
# or
sudo systemctl start mongod
```

#### Step 2: Start the Backend Server
Open a new terminal and run:
```bash
cd server
npm start
```
The server will start on `http://localhost:5000`

#### Step 3: Start the Frontend
Open another terminal and run:
```bash
cd client
npm start
```
The React app will open in your browser at `http://localhost:3000`

## API Endpoints

### Tasks API

- **GET** `/api/tasks` - Get all tasks
- **POST** `/api/tasks` - Create a new task
  - Body: `{ "title": "Task title" }`
- **PUT** `/api/tasks/:id` - Update task status
  - Body: `{ "status": "In Progress" }`
- **DELETE** `/api/tasks/:id` - Delete a task

## Database Schema

### Task Collection
```javascript
{
  title: String (required),
  status: String (enum: ['To Do', 'In Progress', 'Review', 'Done']),
  createdAt: Date (default: current date)
}
```

## Usage

1. Open the application in your browser
2. Type a task title in the input box and click "Add Task"
3. Use the dropdown in each task card to move it between columns
4. Click "Delete" to remove a task

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Make sure MongoDB is running
   - Check if MongoDB is running on the default port (27017)
   - Verify the connection string in `server/server.js`

2. **CORS Error**
   - The backend already includes CORS middleware
   - Make sure the backend is running on port 5000

3. **Frontend Not Loading**
   - Check if React development server is running on port 3000
   - Verify all dependencies are installed

4. **Backend Not Responding**
   - Check if Node.js server is running on port 5000
   - Look for any error messages in the server terminal

### Development Mode

For development with auto-restart:
```bash
# Backend with nodemon
cd server
npm run dev

# Frontend (already in development mode)
cd client
npm start
```

## Technologies Used

- **Frontend**: React 18, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Development Tools**: Create React App, nodemon
