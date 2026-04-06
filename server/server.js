const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://admin:admin123@cluster0.ugvzyph.mongodb.net/kanban-board?appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Review', 'Done'],
    default: 'To Do'
  },
  module: {
    type: String,
    default: null,
    trim: true
  },
  deadline: {
    type: Date,
    default: null
  },
  totalTimeSpent: {
    type: Number,
    default: 0
  },
  lastStartTime: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model('Task', taskSchema);

// API Routes

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
});

// Create new task
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, deadline, module } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = new Task({
      title: title.trim(),
      status: 'To Do',
      deadline: deadline ? new Date(deadline) : null,
      module: module ? module.trim() : null
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
});

// Update task status
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, title, module, totalTimeSpent, lastStartTime } = req.body;

    // Build update object dynamically
    const updateData = {};
    
    if (status && ['To Do', 'In Progress', 'Review', 'Done'].includes(status)) {
      updateData.status = status;
    }
    
    if (title) {
      updateData.title = title.trim();
    }
    
    if (module !== undefined) {
      updateData.module = module ? module.trim() : null;
    }
    
    if (totalTimeSpent !== undefined) {
      updateData.totalTimeSpent = totalTimeSpent;
    }
    
    if (lastStartTime !== undefined) {
      updateData.lastStartTime = lastStartTime ? new Date(lastStartTime) : null;
    }

    const task = await Task.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
