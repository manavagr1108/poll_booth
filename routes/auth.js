const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// router.post('/register',(req,res) => {
//     res.send('hello')
// })

router.post('/register',authController.register )
router.post('/login',authController.login )
router.post('/admin',authController.admin )
// router.post('/recent',authController.recent )
// router.post('/login',(req,res) => {
//     res.send('hello')
// })

module.exports = router;
