// models/Task.js
import mongoose from 'mongoose';

// Define the Mongoose schema for a Task
const TaskSchema = new mongoose.Schema({
  taskOwner: {
    type: String,
    default: 'Amit Seth', // Default value as per frontend logic
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  dueDate: {
    type: String, // Storing as string "YYYY-MM-DD" from date input
    required: true,
  },
  contact: {
    type: String,
    default: '',
  },
  account: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed', 'Deferred', 'Waiting on Someone Else'],
    default: 'Not Started',
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'High',
  },
  reminder: {
    type: Boolean,
    default: false,
  },
  repeat: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists to prevent OverwriteModelError during hot-reloads (nodemon)
const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;
