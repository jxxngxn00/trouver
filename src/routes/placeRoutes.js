import { Router } from 'express';
const router = Router();
import placeController from '../controllers/placeController.js';

router.get('/place', () => { placeController.getPlaces });

// module.exports = router;
export default router;