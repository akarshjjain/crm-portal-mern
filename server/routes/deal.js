// // routes/deal.js
// import express from 'express';
// import { getDeals, createDeal, updateDeal, deleteDeal } from '../controllers/dealController.js'; // Ensure .js extension

// const router = express.Router();

// // Define deal API routes
// router.get('/', getDeals);       // GET /api/deal
// router.post('/', createDeal);    // POST /api/deal
// router.put('/:id', updateDeal);  // PUT /api/deal/:id
// router.delete('/:id', deleteDeal); // DELETE /api/deal/:id

// export default router;


// routes/dealRoutes.js
import express from 'express';
import { getDeals, createDeal, updateDeal, deleteDeal, getDealById } from '../controllers/dealController.js';

const router = express.Router();

// Define routes for deals
router.get('/', getDeals); // GET all deals (can include query filters like dealOwner)
router.post('/', createDeal); // POST to create a new deal
router.get('/:id', getDealById); // GET a single deal by ID
router.put('/:id', updateDeal); // PUT to update a deal by ID
router.delete('/:id', deleteDeal); // DELETE a deal by ID

export default router;
