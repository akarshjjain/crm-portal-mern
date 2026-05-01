// routes/contact.js
import express from 'express';
import { getContacts, createContact, updateContact, deleteContact, getContactById } from '../controllers/contactController.js'; // Ensure .js extension

const router = express.Router();

// Define contact API routes
router.get('/', getContacts);       // GET /api/contact
router.post('/', createContact);    // POST /api/contact
router.put('/:id', updateContact);  // PUT /api/contact/:id
router.delete('/:id', deleteContact); // DELETE /api/contact/:id
router.get('/:id', getContactById);

export default router;
