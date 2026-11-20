const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const audioDir = path.join(projectDir, 'assets', 'audio');
const imgDir = path.join(projectDir, 'images');

if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

// Audio configuration: 22050 Hz, 16-bit Mono PCM
const sampleRate = 22050;
const durationSec = 22; // Complete musical rendition of the 4 lines of Vakratunda Mahakaya
const numSamples = sampleRate * durationSec;
const buffer = Buffer.alloc(44 + numSamples * 2);

// Write WAV Header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + numSamples * 2, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20); // PCM
buffer.writeUInt16LE(1, 22); // Mono
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * 2, 28);
buffer.writeUInt16LE(2, 32); // BlockAlign (1 channel * 2 bytes)
buffer.writeUInt16LE(16, 34); // Bits per sample
buffer.write('data', 36);
buffer.writeUInt32LE(numSamples * 2, 40);

// Key of D (Raga Yaman / Bhupali devotional scale)
// D4 = 293.66, E4 = 329.63, F#4 = 369.99, G4 = 392.00, A4 = 440.00, B4 = 493.88, C#5 = 554.37, D5 = 587.33
const D3 = 146.83;
const A3 = 220.00;
const D4 = 293.66;
const E4 = 329.63;
const Fs4 = 369.99;
const G4 = 392.00;
const A4 = 440.00;
const B4 = 493.88;
const Cs5 = 554.37;
const D5 = 587.33;

// Musical phrases for "Vakratunda Mahakaya Suryakoti Samaprabha | Nirvighnam Kurume Deva Sarvakaryeshu Sarvada"
const melodyNotes = [
  // Intro bell chimes
  { start: 0.5, dur: 1.8, freq: A4, type: 'bell', vol: 0.35 },
  { start: 1.8, dur: 1.8, freq: D5, type: 'bell', vol: 0.40 },

  // Line 1: "Va - kra - tun - da   Ma - ha - ka - ya"
  { start: 3.2, dur: 0.65, freq: D4, type: 'flute', vol: 0.28 },
  { start: 3.9, dur: 0.65, freq: E4, type: 'flute', vol: 0.30 },
  { start: 4.6, dur: 0.85, freq: Fs4, type: 'flute', vol: 0.32 },
  { start: 5.5, dur: 0.75, freq: Fs4, type: 'flute', vol: 0.30 },
  { start: 6.3, dur: 0.70, freq: A4, type: 'flute', vol: 0.34 },
  { start: 7.0, dur: 0.70, freq: A4, type: 'flute', vol: 0.34 },
  { start: 7.7, dur: 0.85, freq: B4, type: 'flute', vol: 0.36 },
  { start: 8.6, dur: 1.20, freq: A4, type: 'flute', vol: 0.32 },

  // Line 2: "Sur - ya - ko - ti   Sa - ma - pra - bha"
  { start: 10.0, dur: 0.70, freq: B4, type: 'flute', vol: 0.35 },
  { start: 10.7, dur: 0.75, freq: D5, type: 'flute', vol: 0.38 },
  { start: 11.5, dur: 0.70, freq: B4, type: 'flute', vol: 0.34 },
  { start: 12.2, dur: 0.85, freq: A4, type: 'flute', vol: 0.32 },
  { start: 13.1, dur: 0.65, freq: Fs4, type: 'flute', vol: 0.30 },
  { start: 13.8, dur: 0.65, freq: E4, type: 'flute', vol: 0.28 },
  { start: 14.5, dur: 1.40, freq: D4, type: 'flute', vol: 0.32 },

  // Accent temple bell on Samaprabha resolution
  { start: 14.5, dur: 2.2, freq: D5, type: 'bell', vol: 0.30 },

  // Line 3 & 4 combined cadence: "Nirvighnam Kurume Deva Sarvakaryeshu Sarvada"
  { start: 16.0, dur: 0.60, freq: D4, type: 'flute', vol: 0.26 },
  { start: 16.6, dur: 0.60, freq: Fs4, type: 'flute', vol: 0.28 },
  { start: 17.2, dur: 0.65, freq: A4, type: 'flute', vol: 0.32 },
  { start: 17.9, dur: 0.70, freq: B4, type: 'flute', vol: 0.34 },
  { start: 18.6, dur: 0.70, freq: A4, type: 'flute', vol: 0.32 },
  { start: 19.3, dur: 0.75, freq: Fs4, type: 'flute', vol: 0.28 },
  { start: 20.1, dur: 1.60, freq: D4, type: 'flute', vol: 0.32 },

  // Final resolving temple chime
  { start: 20.1, dur: 2.5, freq: D5, type: 'bell', vol: 0.32 }
];

for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  let wave = 0;

  // 1. Continuous Meditative Tanpura Drone in D
  // Fundamental D3 + Quint A3 + Octave D4 + soft harmonics
  const tanpuraDrone = 
    0.16 * Math.sin(2 * Math.PI * D3 * t) +
    0.10 * Math.sin(2 * Math.PI * A3 * t) +
    0.08 * Math.sin(2 * Math.PI * D4 * t) +
    0.04 * Math.sin(2 * Math.PI * (A3 * 2) * t) * (0.8 + 0.2 * Math.sin(2 * Math.PI * 0.4 * t)); // gentle acoustic swirl

  wave += tanpuraDrone;

  // 2. Synthesize Melody Notes
  melodyNotes.forEach(n => {
    if (t >= n.start && t < n.start + n.dur) {
      const dt = t - n.start;
      if (n.type === 'bell') {
        // Metallic temple bell: pure fundamental + inharmonic bell overtones + sharp attack, long exponential decay
        const env = Math.exp(-2.2 * dt);
        const bellTone = 
          0.60 * Math.sin(2 * Math.PI * n.freq * dt) +
          0.25 * Math.sin(2 * Math.PI * (n.freq * 2.76) * dt) +
          0.15 * Math.sin(2 * Math.PI * (n.freq * 4.07) * dt);
        wave += n.vol * bellTone * env;
      } else if (n.type === 'flute') {
        // Warm devotional Bansuri/Flute: soft attack, subtle breath vibrato, gentle release
        const attack = Math.min(1, dt / 0.08);
        const release = Math.max(0, 1 - (dt / n.dur));
        const env = Math.sin((dt / n.dur) * Math.PI) * Math.min(attack, release * 1.5);
        const vibrato = 1 + 0.005 * Math.sin(2 * Math.PI * 5.2 * dt); // 5.2 Hz gentle Indian vocal/flute vibrato
        const f = n.freq * vibrato;
        const fluteTone = 
          0.70 * Math.sin(2 * Math.PI * f * dt) +
          0.20 * Math.sin(2 * Math.PI * (f * 2) * dt) +
          0.08 * Math.sin(2 * Math.PI * (f * 3) * dt);
        wave += n.vol * fluteTone * env;
      }
    }
  });

  // Master fade-in (1.5s) and fade-out (1.5s) for smooth audio looping
  const fadeIn = Math.min(1, t / 1.5);
  const fadeOut = Math.min(1, (durationSec - t) / 1.5);
  const masterEnvelope = fadeIn * fadeOut;

  // Clamp and write 16-bit PCM sample
  const sample = Math.max(-1, Math.min(1, wave * masterEnvelope)) * 0.45 * 32767;
  buffer.writeInt16LE(Math.floor(sample), 44 + i * 2);
}

// Write to all audio destinations
const targets = [
  path.join(audioDir, 'vakratund-mahakay.mp3'),
  path.join(audioDir, 'vakratunda-mahakaya.mp3'),
  path.join(audioDir, 'ganesh-vandana.mp3'),
  path.join(imgDir, 'vakratund-mahakay.mp3'),
  path.join(imgDir, 'ganesh-mantra.mp3')
];

targets.forEach(dest => {
  fs.writeFileSync(dest, buffer);
  console.log(`Saved audio to ${dest} (${buffer.length} bytes)`);
});

console.log('✓ Vakratunda Mahakaya audio track generated successfully!');
