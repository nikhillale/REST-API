const express = require('express');

const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const productController = require('../controller/Product')

router.get('/', productController.get_all_product);
//---------------------------------------------------------
router.post('/',checkAuth ,productController.add_product);
//---------------------------------------------------------
router.get('/:productID', checkAuth ,productController.get_product_by_ID);
//---------------------------------------------------------

router.patch('/:productId',checkAuth,productController.update_product);
//---------------------------------------------------------

router.delete('/:productId', checkAuth ,productController.delete_product);


module.exports = router;