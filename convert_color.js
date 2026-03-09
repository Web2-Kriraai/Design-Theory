const fs = require('fs');
const path = require('path');

const OLD_COLOR_1 = '#7c3aed';
const OLD_COLOR_2 = '#7C3AED';
const NEW_COLOR = '#31275c';
const NEW_COLOR_UPPER = '#31275C';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            // skip node_modules and .next
            if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
                walkDir(dirPath, callback);
            }
        } else {
            // only process text files
            if (f.endsWith('.js') || f.endsWith('.jsx') || f.endsWith('.css') || f.endsWith('.json') || f.endsWith('.md')) {
                callback(dirPath);
            }
        }
    });
}

let modifiedCount = 0;

walkDir(__dirname, function (filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Case insensitive global replace
    content = content.replace(/#7c3aed/gi, (match) => {
        if (match === '#7c3aed') return NEW_COLOR;
        if (match === '#7C3AED') return NEW_COLOR_UPPER;
        return NEW_COLOR;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
        console.log(`Updated: ${filePath}`);
    }
});

console.log(`\nReplacement complete. Modified ${modifiedCount} files.`);
