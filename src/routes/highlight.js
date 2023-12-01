const { Router } = require('express');
const { HighlightController } = require('../controllers/highlight.js');

const router = Router();

const highlightController = new HighlightController();

router.get('/all', highlightController.getAll);
router.get('/:id', highlightController.getById);
router.post('/create', highlightController.create);
router.put('/update/:id', highlightController.update);
router.delete('/delete/:id', highlightController.exclude);

module.exports = router;