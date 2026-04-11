const { readData, writeData } = require('./fileHelper');

exports.submitReview = (req, res) => {
    const { reviewerId, submissionId, rating, comment } = req.body;

    if (!reviewerId || !submissionId || !rating || !comment) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const reviews = readData('reviews.json');

    const newReview = {
        id: `rev-${Date.now()}`,
        reviewerId,
        submissionId,
        rating: Number(rating),
        comment
    };

    reviews.push(newReview);
    writeData('reviews.json', reviews);

    res.status(201).json({ message: 'Review submitted successfully', review: newReview });
};

exports.getReviews = (req, res) => {
    const { submissionId, reviewerId } = req.query;
    let reviews = readData('reviews.json');

    if (submissionId) {
        reviews = reviews.filter(rev => rev.submissionId === submissionId);
    }
    if (reviewerId) {
        reviews = reviews.filter(rev => rev.reviewerId === reviewerId);
    }

    res.status(200).json(reviews);
};
