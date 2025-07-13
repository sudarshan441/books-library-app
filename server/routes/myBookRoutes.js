const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const myBookController = require('../controllers/myBookController');

router.use(authMiddleware);

router.get('/', myBookController.getMyBooks);
router.post('/:bookId', myBookController.addBookToUser);
router.patch('/:bookId/status', myBookController.updateStatus);
router.patch('/:bookId/rating', myBookController.updateRating);

module.exports = router;
