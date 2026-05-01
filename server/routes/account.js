import express from 'express';
import { getAccounts, createAccount, deleteAccount, updateAccount, getAccountById } from '../controllers/accountController.js'; // Ensure .js extension and import new function

const router = express.Router();

router.get('/', getAccounts);
router.post('/', createAccount);
router.delete('/:id', deleteAccount);
router.put('/:id', updateAccount);
router.get('/:id', getAccountById); // NEW ROUTE for fetching a single account by ID

export default router;
