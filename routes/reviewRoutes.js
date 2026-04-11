const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/review', reviewController.submitReview);
router.get('/reviews', reviewController.getReviews);

module.exports = router;
