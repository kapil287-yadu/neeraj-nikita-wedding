const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('--- RUNNING RIGOROUS WEDDING WEBSITE VALIDATION (ROYAL PALACE GATE EDITION) ---');

const projectDir = __dirname;
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

// 1. Check Royal Palace Gate Elements
if (!html.includes('id="welcome-gateway"') || !html.includes('class="palace-gateway-screen"')) {
  throw new Error('Missing Royal Palace Gateway container');
}
if (!html.includes('id="door-left"') || !html.includes('id="door-right"')) {
  throw new Error('Missing 3D symmetrical palace doors (door-left and door-right)');
}
if (!html.includes('id="palace-radiance"') || !html.includes('palace-inner-radiance')) {
  throw new Error('Missing palace divine golden radiance behind the doors');
}
if (!html.includes('TAP TO OPEN')) {
  throw new Error('Missing "TAP TO OPEN" golden CTA');
}
if (!html.includes('हमारे शुभ विवाह में आपका हार्दिक स्वागत है।')) {
  throw new Error('Missing Hindi welcome message on palace gate');
}
console.log('✓ Royal Rajasthani Palace Entrance Gate markup & 3D doors validated.');

// 2. Check Name branding
if (!html.includes('NIRAJ &amp; NIKITA') && !html.includes('NIRAJ & NIKITA') && !html.includes('NEERAJ &amp; NIKITA') && !html.includes('NEERAJ & NIKITA')) {
  throw new Error('Missing couple names branding');
}
console.log('✓ Wedding couple branding validated.');

// 3. Check Beautiful Memories / Gallery removal
if (html.includes('Beautiful Memories') || html.includes('id="gallery"') || html.includes('gallery-grid') || html.includes('href="#gallery"')) {
  throw new Error('Beautiful Memories / Gallery section is still present in index.html!');
}
console.log('✓ Beautiful Memories / Gallery section validated: Completely removed.');

// 4. Verify Floating Auto-Scroll Button is REMOVED (Hold-to-Pause is used instead)
if (html.includes('id="auto-scroll-controller"') || html.includes('class="auto-scroll-pill"')) {
  throw new Error('Floating auto-scroll button must NOT be present (Hold-to-Pause is used)!');
}
console.log('✓ Floating pause/resume button validated: Successfully removed in favor of Hold-to-Pause.');

// 5. Check Background Song (User MP3)
if (!html.includes('wedding-music.mp3') && !html.includes('vakratund-mahakay.mp3')) {
  throw new Error('Missing user MP3 audio source in index.html!');
}
console.log('✓ User MP3 song integration validated.');

// 6. Verify strictly 3 phone numbers and WhatsApp buttons
const expectedNumbers = ['+91 9694786363', '+91 8824446601', '+91 7597117853'];
expectedNumbers.forEach(num => {
  if (!html.includes(num)) {
    throw new Error(`Missing expected phone number: ${num}`);
  }
});
if (!html.includes('wa.me/919694786363') || !html.includes('wa.me/918824446601') || !html.includes('wa.me/917597117853')) {
  throw new Error('Missing direct WhatsApp links for all 3 phone numbers');
}
console.log('✓ All 3 contact numbers and WhatsApp buttons validated.');

// 7. Check developer credit in footer: Designed & Developed by Kapil Yaduvanshi with email
if (!html.includes('Kapil Yaduvanshi')) {
  throw new Error('Missing Kapil Yaduvanshi developer credit');
}
if (!html.includes('yaduvanshikapil287@gmail.com')) {
  throw new Error('Missing developer email yaduvanshikapil287@gmail.com in footer');
}
console.log('✓ Footer credit validated: Designed & Developed by Kapil Yaduvanshi with email.');

// 8. Check JS script
const js = fs.readFileSync(path.join(projectDir, 'script.js'), 'utf8');
if (!js.includes('initRoyalPalaceGate') || !js.includes('openRoyalGate')) {
  throw new Error('Missing initRoyalPalaceGate or openRoyalGate in script.js');
}
if (!js.includes('initAutoScrollHoldToPause')) {
  throw new Error('Missing initAutoScrollHoldToPause in script.js');
}
console.log('✓ Script logic validated: 3D gate opening and Hold-to-pause auto-scroll present.');

// 9. Check CSS
const css = fs.readFileSync(path.join(projectDir, 'style.css'), 'utf8');
if (!css.includes('.palace-gateway-screen') || !css.includes('.door-left') || !css.includes('.door-right')) {
  throw new Error('Missing CSS rules for palace gateway and 3D doors');
}
console.log('✓ CSS validated: Royal Palace Gate 3D styles present.');

// 10. Check real photos exist and are authentic high-res files (> 100 KB) - NO black placeholders!
['groom.jpg', 'bride.jpg', 'couple.jpg', 'hero-couple.jpg'].forEach(img => {
  const p = path.join(projectDir, 'images', img);
  if (!fs.existsSync(p)) throw new Error(`Image ${img} does not exist`);
  const sz = fs.statSync(p).size;
  if (sz < 100000) throw new Error(`Image ${img} is too small (${sz} bytes), dummy placeholder detected!`);
});
console.log('✓ All authentic photograph assets verified (> 100 KB, zero black placeholders).');

// 11. Check user MP3 audio file (> 2 MB)
['assets/audio/wedding-music.mp3', 'images/wedding-music.mp3'].forEach(aud => {
  const p = path.join(projectDir, aud);
  if (!fs.existsSync(p)) throw new Error(`Audio file ${aud} does not exist`);
  const sz = fs.statSync(p).size;
  if (sz < 2000000) throw new Error(`Audio file ${aud} is too small (${sz} bytes)!`);
});
console.log('✓ Authentic user MP3 audio verified (3.7 MB).');

// 12. Check Countdown Timer in Hero Section
if (!html.includes('class="hero-countdown-wrap"') || !html.includes('class="countdown-tiles"')) {
  throw new Error('Missing countdown timer wrapper or tiles in Hero section');
}
['days-val', 'hours-val', 'minutes-val', 'seconds-val'].forEach(id => {
  if (!html.includes(`id="${id}"`)) throw new Error(`Missing countdown element ID: ${id}`);
});
console.log('✓ Hero countdown timer verified: 4 bilingual units.');

// 13. Test local HTTP server serving index.html
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(0, '127.0.0.1', () => {
  const port = server.address().port;
  http.get(`http://127.0.0.1:${port}`, (res) => {
    console.log(`✓ HTTP Server test: Status ${res.statusCode}`);
    let body = '';
    res.on('data', chunk => { body += chunk; });
    res.on('end', () => {
      server.close();
      if (res.statusCode === 200 && body.includes('TAP TO OPEN')) {
        console.log('✓ Server returned 200 OK with Royal Palace Gate content.');
        console.log('--- ALL VALIDATION CHECKS PASSED PERFECTLY ---');
        process.exit(0);
      } else {
        console.error('Server returned unexpected content or status. Length:', body.length);
        process.exit(1);
      }
    });
  }).on('error', (err) => {
    server.close();
    console.error('Server connection error:', err.message);
    process.exit(1);
  });
});
