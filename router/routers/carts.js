const {Router} = require('express');
const CartController = require('../../controller/CartController');

const router = Router();
const cartCtrl = new CartController();

router.get('/', cartCtrl.getAll);

module.exports = router;