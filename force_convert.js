const fs = require('fs');
const path = require('path');

const NEW_COLOR = '#31275c';
const NEW_COLOR_UPPER = '#31275C';

let modifiedFiles = 0;

function processFile(filePath) {
    const originalContent = fs.readFileSync(filePath, 'utf8');

    // We only care if the old color exists
    if (!/#7c3aed/i.test(originalContent)) {
        return;
    }

    const newContent = originalContent.replace(/#7c3aed/gi, match => {
        return match === '#7C3AED' ? NEW_COLOR_UPPER : NEW_COLOR;
    });

    if (newContent !== originalContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        modifiedFiles++;
        console.log(`Updated: ${filePath}`);
    }
}

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            if (['node_modules', '.next', '.git', 'brain'].includes(entry.name)) {
                continue;
            }
            walk(fullPath);
        } else if (entry.isFile() && /\.(js|jsx|css|json|md)$/.test(entry.name)) {
            processFile(fullPath);
        }
    }
}

console.log('Starting explicit color replacement...');
walk(__dirname);
console.log(`Replacement complete. Modified ${modifiedFiles} files.`);
