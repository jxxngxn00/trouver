import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("안녕하세요 API 입니다.");
});

export default router;