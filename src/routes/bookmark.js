import { Router } from 'express';
const router = Router();
import { CgetPlaceList5, CgetPlace, CgetPlaceListByCate5, CgetPlaceListBySearch } from '../controllers/place.js';


router.get("/", (req, res) => { res.send("bookmark.")});
router.post("/save", (req, res) => { res.send("bookmark.")});
router.delete("/unsave", (req, res) => { res.send("bookmark.")});
// router.get('/getPlaceList', CgetPlaceList);

export default router;