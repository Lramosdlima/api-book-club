const { Router } = require('express');
const { BookChallengeController } = require('../controllers/bookChallenge');

const router = Router();

const bookChallengeController = new BookChallengeController();

router.get('/all', bookChallengeController.getAll);
router.get('/:id', bookChallengeController.getById);
router.post('/create', bookChallengeController.create);
router.put('/update/:id', bookChallengeController.update);
router.delete('/delete/:id', bookChallengeController.exclude);

module.exports = router;