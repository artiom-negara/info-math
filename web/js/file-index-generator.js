const fs = require('fs');
const path = require('path');

function generateFileStructure(targetDir, dirPath, basePath) {
    let structure = {};

    // Read the directory
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    var files = [];
    for (const item of items) {
        const itemPath = path.join(dirPath, item.name);
        const relativePath = path.relative(basePath, itemPath);

        if (item.isDirectory()) {
            // Recursively read subdirectories
            structure[item.name] = generateFileStructure(targetDir, itemPath, basePath);
        } else {
            // Use the file name as the key and its relative path as the value
            files.push(targetDir + relativePath.replace(/\\/g, '/'));
        }
    }

    structure['files'] = files;

    return structure;
}

// Starting directory (modify this to your target directory)
const targetDir = '../dosare/'; // Example: './myProject/'
const basePath = path.resolve(targetDir);
// Generate the file structure
const fileStructure = generateFileStructure(targetDir.replace('../', ''), basePath, basePath);

// Convert the structure to a nicely formatted JSON string
const jsonStructure = JSON.stringify(fileStructure, null, 2);

// Format the output as a JavaScript variable assignment
const jsContent = `const fileStructure = ${jsonStructure};`;

// Save the JS content to a file
fs.writeFileSync('file-index.js', jsContent);

console.log('File structure saved to file-index.js');
