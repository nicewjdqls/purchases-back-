const express = require('express');
const router = express.Router();
const purchasesController = require('../controller/purchases.controller');

// 방 예약 요청
router.post('/', purchasesController.reservation);

module.exports = router;
