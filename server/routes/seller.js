    // import express from 'express';
    // import { addSeller } from '../controllers/sellerController.js';
    // import authMiddleware from '../middleware/authMiddleware.js';
    // import { getSellers, getSeller, updateSeller, deleteSeller} from '../controllers/sellerController.js';


    // const router = express.Router();

    // router.get('/', authMiddleware, getSellers);
    // router.post('/add', authMiddleware, addSeller)
    // router.get('/:id', authMiddleware, getSeller)
    // router.put('/:id', authMiddleware, updateSeller)
    // router.delete('/:id', authMiddleware, deleteSeller)

    // export default router;  

    // routes/seller.js
import express from 'express';
import { getSellers, createSeller, updateSeller, deleteSeller, getSellerById } from '../controllers/sellerController.js'; // Ensure .js extension

const router = express.Router();

// Define seller API routes
router.get('/', getSellers);
router.post('/', createSeller);
router.put('/:id', updateSeller);
router.delete('/:id', deleteSeller);
router.get('/:id', getSellerById);

export default router;
