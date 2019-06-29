const express = require('express');
const mongooes = require('mongoose');
const Order = require('../Model/order');
const checkAuth = require('../middleware/check-auth');
const orderController = require('../controller/orders');

const router = express.Router();

router.get('/',checkAuth, orderController.orders_get_all);
//-----------------------------------------

router.post('/',checkAuth,orderController.order_create);
//-----------------------------------------

router.get('/:orderId',checkAuth, orderController.order_get_one);

//--------------------------------------------
router.delete('/:orderId',checkAuth, orderController.order_delete);

module.exports = router;