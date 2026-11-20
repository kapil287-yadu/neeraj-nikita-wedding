const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const indexPath = path.join(projectDir, 'index.html');
const scriptPath = path.join(projectDir, 'script.js');
const pkgPath = path.join(projectDir, 'package.json');

// ==========================================
// 1. UPDATE index.html
// ==========================================
let html = fs.readFileSync(indexPath, 'utf8');

// A. Replace Niraj -> Neeraj in names and titles
html = html.replace(/Niraj &amp; Nikita/g, 'Neeraj &amp; Nikita');
html = html.replace(/NIRAJ &amp; NIKITA/g, 'NEERAJ &amp; NIKITA');
html = html.replace(/Niraj & Nikita/g, 'Neeraj & Nikita');
html = html.replace(/NIRAJ & NIKITA/g, 'NEERAJ & NIKITA');
html = html.replace(/niraj-nikita-wedding/g, 'neeraj-nikita-wedding');
html = html.replace(/<span>NIRAJ<\/span>/g, '<span>NEERAJ</span>');
html = html.replace(/<span class="en-name">Niraj<\/span>/g, '<span class="en-name">Neeraj</span>');
html = html.replace(/alt="Niraj - The Groom"/g, 'alt="Neeraj - The Groom"');
html = html.replace(/alt="Niraj and Nikita"/g, 'alt="Neeraj and Nikita"');
html = html.replace(/Niraj Portrait/g, 'Neeraj Portrait');
html = html.replace(/Niraj Full Length Stage/g, 'Neeraj Full Length Stage');
html = html.replace(/Niraj/g, 'Neeraj');
html = html.replace(/NIRAJ/g, 'NEERAJ');

// B. Remove Gallery from Desktop Navigation
const navGalleryRegex = /\s*<a href="#gallery" class="nav-item">[\s\S]*?<\/a>/;
html = html.replace(navGalleryRegex, '');

// C. Update Background Audio sources for Vakratunda Mahakaya
const audioTagOld = /<audio id="wedding-audio"[\s\S]*?<\/audio>/;
const audioTagNew = `<audio id="wedding-audio" loop preload="auto">
    <source src="assets/audio/vakratund-mahakay.mp3" type="audio/mpeg">
    <source src="assets/audio/vakratunda-mahakaya.mp3" type="audio/mpeg">
    <source src="images/vakratund-mahakay.mp3" type="audio/mpeg">
    <source src="images/ganesh-mantra.mp3" type="audio/mpeg">
    <source src="assets/audio/ganesh-vandana.mp3" type="audio/mpeg">
  </audio>`;
html = html.replace(audioTagOld, audioTagNew);

// D. Update Welcome Gateway Shloka to Vakratunda Mahakaya
const oldShlokaRegex = /<div class="bilingual-line center-line">\s*<span class="en-shloka">Shree Ganeshaya Namah<\/span>\s*<span class="hi-shloka">॥ श्री गणेशाय नमः ॥<\/span>\s*<\/div>/;
const newShlokaText = `<div class="bilingual-line center-line">
          <span class="en-shloka">Vakratunda Mahakaya • वक्रतुण्ड महाकाय</span>
          <span class="hi-shloka">॥ श्री गणेशाय नमः ॥</span>
        </div>
        <div class="vakratunda-shloka-banner text-center">
          <p class="hi-mantra-verse">वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।</p>
          <p class="hi-mantra-verse">निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥</p>
        </div>`;
html = html.replace(oldShlokaRegex, newShlokaText);

// E. Update Music Toggle Button in Nav
html = html.replace(
  /<span class="music-en">Music: ON<\/span>\s*<span class="music-hi">संगीत चालू<\/span>/,
  `<span class="music-en">Vakratunda Mahakaya</span>\n            <span class="music-hi">वक्रतुण्ड महाकाय</span>`
);

// F. Completely remove the Gallery section and Lightbox modal
const gallerySectionRegex = /<!-- =+[\r\n\s]+6\. MAIN PHOTO GALLERY[\s\S]*?<!-- =+[\r\n\s]+7\. VENUE & DIRECTIONS SECTION/;
const venueSectionReplacement = `<!-- ==============================================
         6. VENUE & DIRECTIONS SECTION`;
html = html.replace(gallerySectionRegex, venueSectionReplacement);

// Renumber remaining sections in comments
html = html.replace(/7\. VENUE & DIRECTIONS SECTION/g, '6. VENUE & DIRECTIONS SECTION');
html = html.replace(/8\. CONTACT INFORMATION SECTION/g, '7. CONTACT INFORMATION SECTION');
html = html.replace(/9\. ABOUT THE DEVELOPER SECTION/g, '8. ABOUT THE DEVELOPER SECTION');
html = html.replace(/10\. ROYAL FOOTER/g, '9. ROYAL FOOTER');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✓ index.html updated successfully (Neeraj spelling, Vakratunda audio, Gallery removed).');

// ==========================================
// 2. UPDATE script.js
// ==========================================
let js = fs.readFileSync(scriptPath, 'utf8');

// Replace Niraj -> Neeraj
js = js.replace(/Niraj/g, 'Neeraj');
js = js.replace(/NIRAJ/g, 'NEERAJ');
js = js.replace(/niraj/g, 'neeraj');

// Remove initLightbox from DOMContentLoaded
js = js.replace(/\s*initLightbox\(\);/, '');

// Update Music UI labels
js = js.replace(
  /if \(enLabel\) enLabel\.textContent = 'Music: ON';\s*if \(hiLabel\) hiLabel\.textContent = 'संगीत चालू';/,
  `if (enLabel) enLabel.textContent = 'Vakratunda Mahakaya: ON';\n    if (hiLabel) hiLabel.textContent = 'वक्रतुण्ड महाकाय: चालू';`
);

js = js.replace(
  /if \(enLabel\) enLabel\.textContent = 'Music: OFF';\s*if \(hiLabel\) hiLabel\.textContent = 'संगीत बंद';/,
  `if (enLabel) enLabel.textContent = 'Music: OFF';\n    if (hiLabel) hiLabel.textContent = 'संगीत: बंद';`
);

// Remove Lightbox section
const lightboxJsRegex = /\/\* =+[\r\n\s]+8\. LIGHTBOX MODAL FUNCTIONALITY[\s\S]*$/;
js = js.replace(lightboxJsRegex, '');

fs.writeFileSync(scriptPath, js, 'utf8');
console.log('✓ script.js updated successfully.');

// ==========================================
// 3. UPDATE package.json
// ==========================================
let pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.name = 'neeraj-nikita-wedding';
pkg.description = 'Royal Digital Wedding Invitation Website for Neeraj & Nikita | Jaipur, Rajasthan';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
console.log('✓ package.json updated successfully.');
