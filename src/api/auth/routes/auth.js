const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authController = require('../controllers/auth');

// 회원가입 라우트
router.post('/register', userController.registerUser);

// 로그인 라우트
router.post('/login', authController.loginUser);

module.exports = router;