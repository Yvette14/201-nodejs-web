const {Router} = require('express');
const ItemController = require('../../controller/ItemController');

const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:id', itemCtrl.getOne);
router.post('/', itemCtrl.create);
router.delete('/:id', itemCtrl.delete);

module.exports = router;