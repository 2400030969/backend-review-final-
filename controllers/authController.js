const { readData, writeData } = require('./fileHelper');

exports.register = (req, res) => {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const users = readData('users.json');
    
    // Check if email already exists
    const userExists = users.some(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password, // Not hashing for simplicity in beginner project
        role
    };

    users.push(newUser);
    writeData('users.json', users);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const users = readData('users.json');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // In a real app we would send a JWT
    res.status(200).json({ message: 'Login successful', user });
};
