const fs = require('fs');
const path = require('path');

const makeStyleTags = (urls) => urls
    .map(url => `<link rel="stylesheet" href="${url}">`)
    .join('\n')

const makeScriptTags = (urls) => urls
    .map(url => `<script src="${url}"></script>`)
    .join('\n')
    

const getFiles = (settings) => { 
    
    return fs.readdirSync('./src/html')
        .filter(file => file.indexOf('.html') > -1)
        .map(file => {
            return {
                title: settings.pagetitle,
                additionalCss: makeStyleTags(settings.css),
                additionalJs: makeScriptTags(settings.js),
                filename: file,
                template: path.resolve(__dirname, 'template.html'),
                entry: path.resolve('./src/html', file),
            }
        });
}

module.exports = (settings = {}) => {
    return {
        files: getFiles(settings)
    }
}
