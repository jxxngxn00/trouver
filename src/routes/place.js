import { Router } from 'express';
const router = Router();
// import placeController from '../controllers/placeController.js';
import CgetPlaceList, { CgetPlaceListByCate, CupdateHit } from "../controllers/place.js";
import { CgetPlaceList5, CgetPlace, 
    CgetPlaceListByCate5, CgetPlaceListBySearch } from '../controllers/place.js';


router.get("/", (req, res) => { res.send("placeRoutes.")});
router.get('/getPlaceList', CgetPlaceList);
router.get('/getPlaceList5', CgetPlaceList5);
router.get('/getPlaceListBySearch/:searchTerm', CgetPlaceListBySearch);
router.get('/getPlaceListByCate5/:cate', CgetPlaceListByCate5);
router.get('/getPlaceListByCate/:cate', CgetPlaceListByCate);
router.get('/getPlace/:id', CgetPlace);
router.patch('/updateHits/:id', CupdateHit);

export default router;