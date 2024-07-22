import { Router } from 'express';
const router = Router();
// import placeController from '../controllers/placeController.js';
import CgetPlaceList from "../controllers/place.js";
import { CgetPlaceList5, CgetPlace, CgetPlaceListByCate5, CgetPlaceListBySearch } from '../controllers/place.js';


router.get("/", (req, res) => { res.send("placeRoutes.")});
router.get('/getPlaceList', CgetPlaceList);
router.get('/getPlaceList5', CgetPlaceList5);
router.get('/getPlaceListBySearch/:searchTerm', CgetPlaceListBySearch);
router.get('/getPlaceListByCate5/:cate', CgetPlaceListByCate5);
router.get('/getPlace/:id', CgetPlace);

export default router;