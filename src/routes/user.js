import { Router } from 'express';
const router = Router();
import { signup } from '../controllers/user.js';	// 유저 컨트롤러 가져오기

router.post('/', signup);			// 회원가입 부분
router.get('/getUserId', );

export default router;