const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'app');

const replaceInFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace CSS variables
    content = content.replace(/--accent-gold-light/g, '--accent-purple-light');
    content = content.replace(/--accent-gold/g, '--accent-purple');

    // Replace hex codes
    content = content.replace(/#B89E7B/g, '#7C3AED'); // Gold to Purple
    content = content.replace(/#C6A87D/g, '#7C3AED'); // Another Gold to Purple
    content = content.replace(/#D9C6A3/g, '#C4B5FD'); // Light Gold to Light Purple
    content = content.replace(/184,158,123/g, '124,58,237'); // RGB gold to RGB purple

    // Specific hover state interventions
    // In auth and admin login buttons, we want hover to be yellow instead of purple
    if (filePath.includes('auth\\page.js') || filePath.includes('admin\\login\\page.js') || filePath.includes('admin\\signup\\page.js')) {
        content = content.replace(/\.auth-btn:hover:not\(:disabled\) \{ background: #7C3AED; \}/, '.auth-btn:hover:not(:disabled) { background: #EAB308; }');
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
};

const walkSync = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkSync(filePath);
        } else if (file.endsWith('.css') || file.endsWith('.js') || file.endsWith('.jsx')) {
            replaceInFile(filePath);
        }
    }
};

walkSync(targetDir);
console.log('Update complete.');
