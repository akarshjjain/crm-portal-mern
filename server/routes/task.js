// // routes/task.js
// import express from 'express';
// import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js'; // Ensure .js extension

// const router = express.Router();

// // Define task API routes
// router.get('/', getTasks);       // GET /api/task
// router.post('/', createTask);    // POST /api/task
// router.put('/:id', updateTask);  // PUT /api/task/:id
// router.delete('/:id', deleteTask); // DELETE /api/task/:id

// export default router;


// server/routes/task.js
import express from 'express';
// Make sure getTaskById is imported here
import { getTasks, createTask, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js'; 

const router = express.Router();

// Define task API routes
router.get('/', getTasks);          // GET /api/task (for all tasks)
router.get('/:id', getTaskById);    // GET /api/task/:id (CRUCIAL: for single task by ID)
router.post('/', createTask);       // POST /api/task
router.put('/:id', updateTask);     // PUT /api/task/:id
router.delete('/:id', deleteTask);  // DELETE /api/task/:id

export default router;
