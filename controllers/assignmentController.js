const { readData, writeData } = require('./fileHelper');

exports.createAssignment = (req, res) => {
    const { title, description, deadline, createdBy } = req.body;

    if (!title || !description || !deadline || !createdBy) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const assignments = readData('assignments.json');

    const newAssignment = {
        id: `assignment-${Date.now()}`,
        title,
        description,
        deadline,
        createdBy
    };

    assignments.push(newAssignment);
    writeData('assignments.json', assignments);

    res.status(201).json({ message: 'Assignment created successfully', assignment: newAssignment });
};

exports.getAssignments = (req, res) => {
    const assignments = readData('assignments.json');
    res.status(200).json(assignments);
};
