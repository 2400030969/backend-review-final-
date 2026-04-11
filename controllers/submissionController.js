const { readData, writeData } = require('./fileHelper');

exports.submitProject = (req, res) => {
    const { studentId, assignmentId } = req.body;
    const file = req.file;

    if (!studentId || !assignmentId || !file) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const submissions = readData('submissions.json');

    const newSubmission = {
        id: `sub-${Date.now()}`,
        studentId,
        assignmentId,
        fileName: file.originalname,
        filePath: file.filename, // Store the uploaded file path
        submittedAt: new Date().toISOString()
    };

    submissions.push(newSubmission);
    writeData('submissions.json', submissions);

    res.status(201).json({ message: 'Project submitted successfully', submission: newSubmission });
};

exports.uploadFileForSubmission = (req, res) => {
    const { submissionId } = req.params;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'File is required' });
    }

    const submissions = readData('submissions.json');
    const submission = submissions.find(sub => sub.id === submissionId);

    if (!submission) {
        return res.status(404).json({ message: 'Submission not found' });
    }

    submission.filePath = file.filename;
    writeData('submissions.json', submissions);

    res.status(200).json({ message: 'File uploaded successfully', submission });
};

exports.getSubmissions = (req, res) => {
    const { assignmentId, studentId } = req.query;
    let submissions = readData('submissions.json');

    if (assignmentId) {
        submissions = submissions.filter(sub => sub.assignmentId === assignmentId);
    }
    if (studentId) {
        submissions = submissions.filter(sub => sub.studentId === studentId);
    }

    res.status(200).json(submissions);
};
