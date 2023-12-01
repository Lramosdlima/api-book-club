const { Router } = require('express');
const { QuizController } = require('../controllers/quiz');

const router = Router();

const quizController = new QuizController();

router.get('/all', quizController.getAll);
router.get('/all/complete', quizController.getAllWithCompleteInfo);
router.get('/:id', quizController.getById);
router.post('/create', quizController.create);
router.put('/update/:id', quizController.update);
router.delete('/delete/:id', quizController.exclude);

module.exports = router;