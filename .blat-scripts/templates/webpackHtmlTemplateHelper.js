const fs = require('fs');
const path = require('path');

const getFiles = () => { 
    
    return fs.readdirSync('./src/html')
        .filter(file => file.indexOf('.html') > -1)
        .map(file => {
            return {
                filename: file,
                template: path.resolve(__dirname, 'template.html'),
                entry: path.resolve('./src/html', file),
            }
        });
}

module.exports = () => {
    return {
        files: getFiles()
    }
}