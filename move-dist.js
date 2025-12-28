const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');
const browserDir = path.join(docsDir, 'browser');

// Move all files from docs/browser to docs
if (fs.existsSync(browserDir)) {
  const files = fs.readdirSync(browserDir);
  
  files.forEach(file => {
    const srcPath = path.join(browserDir, file);
    const destPath = path.join(docsDir, file);
    
    // Move file
    fs.renameSync(srcPath, destPath);
  });
  
  // Remove empty browser directory
  fs.rmdirSync(browserDir);
  
  console.log('✓ Files moved from docs/browser to docs');
}
