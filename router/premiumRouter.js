const express = require('express');
const router = express.Router();
const premiumController = require('../controller/premiumController');
const authenticate = require('../middleware/auth');

router.post('/create-order', authenticate, premiumController.createOrder);
router.get('/verify',authenticate,premiumController.verify)
router.get('/status',authenticate,premiumController.getPremiumStatus)
module.exports = router;
