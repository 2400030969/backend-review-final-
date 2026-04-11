const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const multer = require('multer');

// Configure multer (same as in server.js)
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_'));
    }
});
const upload = multer({ storage });

router.post('/submit', upload.single('file'), submissionController.submitProject);
router.post('/upload-file/:submissionId', upload.single('file'), submissionController.uploadFileForSubmission);
router.get('/submissions', submissionController.getSubmissions);

module.exports = router;
