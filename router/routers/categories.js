const {Router} = require('express');
const CategoryController = require('../../controller/category-controller');

const router = Router();
const categoryCtrl = new CategoryController();

router.get('/', categoryCtrl.getAll);
router.get('/:id', categoryCtrl.getOne);
router.post('/', categoryCtrl.create);
router.delete('/:id', categoryCtrl.delete);
router.put('/:id', categoryCtrl.update);

module.exports = router;