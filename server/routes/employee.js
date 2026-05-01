    import express from 'express';
    import { addEmployee, upload, getEmployees, getEmployee } from '../controllers/employeeController.js';
    import authMiddleware from '../middleware/authMiddleware.js';



    const router = express.Router();

     router.get('/', authMiddleware, getEmployees);
    router.post('/add', authMiddleware, upload.single('image'), addEmployee)
    router.get('/:id', authMiddleware, getEmployee)
    // router.put('/:id', authMiddleware, updateDepartment)
    // router.delete('/:id', authMiddleware, deleteDepartment)

    export default router;