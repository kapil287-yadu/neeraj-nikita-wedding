const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const indexPath = path.join(projectDir, 'index.html');
const stylePath = path.join(projectDir, 'style.css');
const scriptPath = path.join(projectDir, 'script.js');
const pkgPath = path.join(projectDir, 'package.json');
const vercelPath = path.join(projectDir, 'vercel.json');

console.log('--- PREPARING PRODUCTION DEPLOYMENT FIX FOR VERCEL ---');

// 1. Read source files
let html = fs.readFileSync(indexPath, 'utf8');
const css = fs.readFileSync(stylePath, 'utf8');
const js = fs.readFileSync(scriptPath, 'utf8');

// 2. Remove any previously inlined style or script blocks to avoid duplicates
html = html.replace(/<style id="royal-wedding-styles">[\s\S]*?<\/style>/, '');
html = html.replace(/<script id="royal-wedding-script">[\s\S]*?<\/script>/, '');

// 3. Inject CSS into <head> with both external link fallbacks and inlined stylesheet
const styleBlock = `
  <!-- External Stylesheet Fallbacks (Relative & Absolute) -->
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="/style.css">

  <!-- Production Inlined Stylesheet (Instant Zero-FOUC Paint On Vercel) -->
  <style id="royal-wedding-styles">
${css}
  </style>`;

html = html.replace(/<link rel="stylesheet" href="style\.css">/, styleBlock);

// 4. Inject JS before </body> with both external script fallbacks and inlined script
const scriptBlock = `
  <!-- External Script Fallbacks (Relative & Absolute) -->
  <script src="script.js"></script>
  <script src="/script.js"></script>

  <!-- Production Inlined Interactive Logic -->
  <script id="royal-wedding-script">
${js}
  </script>`;

html = html.replace(/<script src="script\.js"><\/script>/, scriptBlock);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✓ index.html updated: 100% self-contained styling & interactivity embedded + external fallbacks.');

// 5. Update package.json (Remove "main": "server.js" so Vercel never treats project as a Serverless Function)
let pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
delete pkg.main; // CRITICAL: Prevents Vercel from routing requests to a serverless lambda!
pkg.private = true;
pkg.scripts = {
  start: "node server.js",
  test: "node test_site.js"
};
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
console.log('✓ package.json updated: "main" field removed to force static edge CDN delivery.');

// 6. Update vercel.json (Explicit static configuration without legacy version 2 builder)
const vercelConfig = {
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "",
  "outputDirectory": ".",
  "cleanUrls": false,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    },
    {
      "source": "/(.*)\\.(css|js|svg|jpg|jpeg|png|mp3|woff2)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
};
fs.writeFileSync(vercelPath, JSON.stringify(vercelConfig, null, 2), 'utf8');
console.log('✓ vercel.json updated: Explicit static configuration with buildCommand: "" and outputDirectory: "."');

// 7. Sync authentic photographs
const imgDir = path.join(projectDir, 'images');
if (fs.existsSync(path.join(imgDir, 'groom-portrait.jpg'))) {
  fs.copyFileSync(path.join(imgDir, 'groom-portrait.jpg'), path.join(imgDir, 'groom.jpg'));
}
if (fs.existsSync(path.join(imgDir, 'bride-seated.jpg'))) {
  fs.copyFileSync(path.join(imgDir, 'bride-seated.jpg'), path.join(imgDir, 'bride.jpg'));
}
if (fs.existsSync(path.join(imgDir, 'couple-rings.jpg'))) {
  fs.copyFileSync(path.join(imgDir, 'couple-rings.jpg'), path.join(imgDir, 'couple.jpg'));
}
console.log('✓ Authentic photographs synced: groom.jpg, bride.jpg, couple.jpg');

console.log('--- PRODUCTION BUILD PREPARATION COMPLETE ---');
