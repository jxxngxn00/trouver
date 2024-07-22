import { Router } from "express";
const router = Router();

router.get("/", (req, res) => { res.send("review CRUD")});
export default router;