const fs = require('fs');
const path = require('path');

const getDataPath = (filename) => path.join(__dirname, '../data', filename);

const readData = (filename) => {
    try {
        const dataPath = getDataPath(filename);
        if (!fs.existsSync(dataPath)) {
            return [];
        }
        const jsonData = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (err) {
        console.error(`Error reading ${filename}:`, err);
        return [];
    }
};

const writeData = (filename, data) => {
    try {
        const dataPath = getDataPath(filename);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
        console.error(`Error writing to ${filename}:`, err);
    }
};

module.exports = {
    readData,
    writeData
};
