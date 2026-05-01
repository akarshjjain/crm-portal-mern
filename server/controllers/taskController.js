// // controllers/taskController.js
// import Task from '../models/Task.js'; // Ensure the .js extension is present

// // Get all tasks
// export const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).json(tasks);
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//     res.status(500).json({ message: 'Server error while fetching tasks.' });
//   }
// };

// // Create a new task
// export const createTask = async (req, res) => {
//   try {
//     const { taskOwner, subject, dueDate, contact, account, status, priority, reminder, repeat, description } = req.body;

//     // Basic validation for required fields
//     if (!subject || !dueDate) {
//       return res.status(400).json({ message: 'Subject and Due Date are required.' });
//     }

//     const newTask = new Task({
//       taskOwner: taskOwner === 'None' ? 'Amit Seth' : taskOwner, // Set default if "None" selected
//       subject,
//       dueDate,
//       contact,
//       account,
//       status,
//       priority,
//       reminder,
//       repeat,
//       description,
//       createdAt: new Date(),
//     });

//     await newTask.save();
//     res.status(201).json(newTask); // Respond with the created document
//   } catch (error) {
//     console.error('Error creating task:', error);
//     res.status(500).json({ message: 'Server error while creating task.' });
//   }
// };

// // Update an existing task
// export const updateTask = async (req, res) => {
//   try {
//     const { id } = req.params; // Task ID from URL parameter
//     const { taskOwner, subject, dueDate, contact, account, status, priority, reminder, repeat, description } = req.body;

//     // Basic validation for required fields
//     if (!subject || !dueDate) {
//       return res.status(400).json({ message: 'Subject and Due Date are required for update.' });
//     }

//     const updateData = {
//       taskOwner: taskOwner === 'None' ? 'Amit Seth' : taskOwner,
//       subject,
//       dueDate,
//       contact,
//       account,
//       status,
//       priority,
//       reminder,
//       repeat,
//       description,
//     };

//     // findByIdAndUpdate ensures we get the updated document back (new: true)
//     // runValidators ensures schema validation runs on update
//     const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

//     if (!updatedTask) {
//       return res.status(404).json({ message: 'Task not found.' });
//     }

//     res.status(200).json(updatedTask); // Respond with the updated document
//   } catch (error) {
//     console.error('Error updating task:', error);
//     res.status(500).json({ message: 'Server error while updating task.' });
//   }
// };

// // Delete a task
// export const deleteTask = async (req, res) => {
//   try {
//     const { id } = req.params; // Task ID from URL parameter
//     const deletedTask = await Task.findByIdAndDelete(id);

//     if (!deletedTask) {
//       return res.status(404).json({ message: 'Task not found.' });
//     }

//     res.status(200).json({ message: 'Task deleted successfully.', deletedTask });
//   } catch (error) {
//     console.error('Error deleting task:', error);
//     res.status(500).json({ message: 'Server error while deleting task.' });
//   }
// };


// server/controllers/taskController.js
import Task from '../models/Task.js'; // Ensure the .js extension is present

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error while fetching tasks.' });
  }
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from URL parameters
    const task = await Task.findById(id); // Find task by ID in MongoDB

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    // Handle invalid ID format specifically (e.g., if it's not a valid MongoDB ObjectId)
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid Task ID format' });
    }
    res.status(500).json({ message: 'Server error while fetching task.' });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { taskOwner, subject, dueDate, contact, account, status, priority, reminder, repeat, description } = req.body;

    // Basic validation for required fields
    if (!subject || !dueDate) {
      return res.status(400).json({ message: 'Subject and Due Date are required.' });
    }

    const newTask = new Task({
      taskOwner: taskOwner === 'None' ? 'Amit Seth' : taskOwner, // Set default if "None" selected
      subject,
      dueDate,
      contact,
      account,
      status,
      priority,
      reminder,
      repeat,
      description,
      createdAt: new Date(),
    });

    await newTask.save();
    res.status(201).json(newTask); // Respond with the created document
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error while creating task.' });
  }
};

// Update an existing task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params; // Task ID from URL parameter
    const { taskOwner, subject, dueDate, contact, account, status, priority, reminder, repeat, description } = req.body;

    // Basic validation for required fields
    if (!subject || !dueDate) {
      return res.status(400).json({ message: 'Subject and Due Date are required for update.' });
    }

    const updateData = {
      taskOwner: taskOwner === 'None' ? 'Amit Seth' : taskOwner,
      subject,
      dueDate,
      contact,
      account,
      status,
      priority,
      reminder,
      repeat,
      description,
    };

    // findByIdAndUpdate ensures we get the updated document back (new: true)
    // runValidators ensures schema validation runs on update
    const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json(updatedTask); // Respond with the updated document
  } catch (error) {
    console.error('Error updating task:', error);
    if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid Task ID format' });
    }
    res.status(500).json({ message: 'Server error while updating task.' });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params; // Task ID from URL parameter
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json({ message: 'Task deleted successfully.', deletedTask });
  } catch (error) {
    console.error('Error deleting task:', error);
    if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid Task ID format' });
    }
    res.status(500).json({ message: 'Server error while deleting task.' });
  }
};
