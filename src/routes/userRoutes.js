const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');	// 유저 컨트롤러 가져오기

router.post('/', userController.signup);			// 회원가입 부분

module.exports = router;