const express = require('express');
const {  createUser, loginUser } = require('../controllers/authControllers');
const router = express.Router();

// router.post('/login',loginUser)
router.post('/register',createUser);
router.post('/login',loginUser);

module.exports=router;