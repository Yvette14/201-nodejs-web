const {Router} = require('express');
const CategoryController = require('../../controller/CategoryController');

const router = Router();
const categoryCtrl = new CategoryController();

router.get('/', categoryCtrl.getAll);
router.get('/:id', categoryCtrl.getOne);

module.exports = router;