const fs = require('fs');
const path = require('path');

const NEW_COLOR = '#31275c';
const NEW_COLOR_UPPER = '#31275C';

function replaceInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content.replace(/#7c3aed/gi, (match) => {
            return match === '#7C3AED' ? NEW_COLOR_UPPER : NEW_COLOR;
        });

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    } catch (e) {
        // Skip files that can't be read as text
    }
}

function traverse(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'brain') continue;

        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            traverse(fullPath);
        } else if (file.match(/\.(js|jsx|css|json|md)$/)) {
            replaceInFile(fullPath);
        }
    }
}

console.log("Starting color replacement...");
traverse(path.join(__dirname, 'app'));
traverse(path.join(__dirname, 'components'));
traverse(path.join(__dirname, 'lib'));
console.log("Color replacement complete.");
