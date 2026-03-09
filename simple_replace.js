const fs = require('fs');
const path = require('path');

const oldColors = ['#7c3aed', '#7C3AED'];
const newColor = '#31275c';

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (['node_modules', '.next', '.git'].includes(file)) continue;
            replaceInDir(fullPath);
        } else if (/\.(js|jsx|css|json|md)$/.test(file)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            for (const oldColor of oldColors) {
                if (content.includes(oldColor)) {
                    content = content.split(oldColor).join(newColor);
                    changed = true;
                }
            }
            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

replaceInDir(__dirname);
console.log('Done!');
