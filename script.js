/**
 * NEERAJ & NIKITA WEDDING - INTERACTIVE JAVASCRIPT
 * Bilingual Royal Experience • 10 - 12 December 2026 | Jaipur, Rajasthan
 * Designed & Developed by Kapil Tamoli
 */

document.addEventListener('DOMContentLoaded', () => {
  initAudioExperience();
  initWelcomeGateway();
  initLiveCountdown();
  initScheduleFilters();
  initMobileNav();
  initScrollAnimations();
});

/* ==========================================================================
   1. DEVOTIONAL AUDIO EXPERIENCE (USER'S AUTHENTIC UPLOADED MP3 ONLY)
   ========================================================================== */
let audioEl = null;
let isAudioMuted = false;

function initAudioExperience() {
  audioEl = document.getElementById('wedding-audio');
  if (!audioEl) return;

  // Set gentle default background volume
  audioEl.volume = 0.25;
  audioEl.loop = true;

  // Check saved session mute preference
  const savedMute = sessionStorage.getItem('wedding_music_muted');
  if (savedMute === 'true') {
    isAudioMuted = true;
    updateMusicUI(false);
  } else {
    isAudioMuted = false;
  }

  const toggleBtn = document.getElementById('music-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleMusic);
  }
}

// Starts ONLY upon clicking "Enter Invitation" button
function startDevotionalMusic() {
  if (!audioEl) return;

  if (isAudioMuted) {
    updateMusicUI(false);
    return;
  }

  const playPromise = audioEl.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      updateMusicUI(true);
    }).catch((err) => {
      console.log('Audio autoplay policy note:', err);
      updateMusicUI(false);
    });
  }
}

function toggleMusic() {
  if (!audioEl) return;

  if (!audioEl.paused) {
    audioEl.pause();
    isAudioMuted = true;
    sessionStorage.setItem('wedding_music_muted', 'true');
    updateMusicUI(false);
  } else {
    isAudioMuted = false;
    sessionStorage.setItem('wedding_music_muted', 'false');
    audioEl.play().then(() => {
      updateMusicUI(true);
    }).catch(() => {
      updateMusicUI(false);
    });
  }
}

function updateMusicUI(isPlaying) {
  const toggleBtn = document.getElementById('music-toggle-btn');
  if (!toggleBtn) return;

  const enLabel = toggleBtn.querySelector('.music-en');
  const hiLabel = toggleBtn.querySelector('.music-hi');

  if (isPlaying && !isAudioMuted) {
    toggleBtn.classList.remove('muted');
    if (enLabel) enLabel.textContent = 'Music: ON';
    if (hiLabel) hiLabel.textContent = 'संगीत: चालू';
  } else {
    toggleBtn.classList.add('muted');
    if (enLabel) enLabel.textContent = 'Music: OFF';
    if (hiLabel) hiLabel.textContent = 'संगीत: बंद';
  }
}


/* ==========================================================================
   2. CINEMATIC WELCOME GATEWAY & PARTICLES
   ========================================================================== */
function initWelcomeGateway() {
  const enterBtn = document.getElementById('btn-enter-invitation');
  const gateway = document.getElementById('welcome-gateway');
  const body = document.body;

  generateWelcomeParticles();

  if (!enterBtn || !gateway) return;

  enterBtn.addEventListener('click', () => {
    startDevotionalMusic();
    gateway.classList.add('cinematic-opened');
    body.classList.remove('welcome-locked');

    setTimeout(() => {
      gateway.style.display = 'none';
    }, 900);
  });
}

function generateWelcomeParticles() {
  const container = document.getElementById('welcome-particles-wrap');
  if (!container) return;

  const count = window.innerWidth < 768 ? 20 : 35;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'gold-dust-particle';
    const size = Math.random() * 4 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.animationDuration = (Math.random() * 6 + 6) + 's';
    p.style.opacity = (Math.random() * 0.6 + 0.3).toString();
    container.appendChild(p);
  }
}


/* ==========================================================================
   3. WEDDING COUNTDOWN TIMER (12 DECEMBER 2026)
   ========================================================================== */
function initLiveCountdown() {
  const weddingDate = new Date('2026-12-12T11:00:00+05:30').getTime();

  const daysEl = document.getElementById('days-val') || document.getElementById('cd-days');
  const hoursEl = document.getElementById('hours-val') || document.getElementById('cd-hours');
  const minsEl = document.getElementById('minutes-val') || document.getElementById('cd-minutes');
  const secsEl = document.getElementById('seconds-val') || document.getElementById('cd-seconds');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function update() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}


/* ==========================================================================
   4. WEDDING SCHEDULE DAY-WISE FILTER TABS
   ========================================================================== */
function initScheduleFilters() {
  const tabs = document.querySelectorAll('.schedule-tab-btn');
  const dayGroups = document.querySelectorAll('.schedule-day-group');

  if (!tabs.length || !dayGroups.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetDay = tab.getAttribute('data-day');

      dayGroups.forEach(group => {
        if (targetDay === 'all' || group.getAttribute('data-day') === targetDay) {
          group.style.display = 'block';
          group.classList.add('tab-fade-in');
        } else {
          group.style.display = 'none';
        }
      });
    });
  });
}


/* ==========================================================================
   5. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}


/* ==========================================================================
   6. CALENDAR EVENT HELPERS
   ========================================================================== */
window.addToCalendar = function(title, startISO, endISO, location, details) {
  const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${startISO}/${endISO}&details=${encodeURIComponent(
    details
  )}&location=${encodeURIComponent(location)}`;

  window.open(gCalUrl, '_blank');
};

window.downloadAllEventsICS = function() {
  const events = [
    {
      title: "Tel Mandap Ceremony - Neeraj & Nikita Wedding",
      desc: "Traditional Tel Mandap ceremony at Tulsi Marriage Garden, Jaipur",
      start: "20261210T100000",
      end: "20261210T120000"
    },
    {
      title: "Khanamati Magar / Khamani - Neeraj & Nikita Wedding",
      desc: "Khanamati Magar ritual and celebratory dinner",
      start: "20261210T180000",
      end: "20261210T210000"
    },
    {
      title: "Haldi Ceremony - Neeraj & Nikita Wedding",
      desc: "Turmeric blessings and celebratory rituals",
      start: "20261211T100000",
      end: "20261211T130000"
    },
    {
      title: "Chak Ceremony - Neeraj & Nikita Wedding",
      desc: "Chak auspicious ritual",
      start: "20261211T140000",
      end: "20261211T150000"
    },
    {
      title: "Mahila Sangeet - Neeraj & Nikita Wedding",
      desc: "Musical dance and celebratory evening",
      start: "20261211T150000",
      end: "20261211T190000"
    },
    {
      title: "Bhat Ceremony - Neeraj & Nikita Wedding",
      desc: "Grand maternal family welcoming and traditional gifts ceremony",
      start: "20261211T210000",
      end: "20261211T233000"
    },
    {
      title: "Lagan-Tika - Neeraj & Nikita Wedding",
      desc: "Formal auspicious tilak ceremony between families",
      start: "20261212T110000",
      end: "20261212T133000"
    },
    {
      title: "Preetibhoj / Wedding Feast - Neeraj & Nikita Wedding",
      desc: "Royal wedding feast honoring all esteemed guests",
      start: "20261212T191500",
      end: "20261212T233000"
    },
    {
      title: "Baraat Prasthan - Neeraj & Nikita Wedding",
      desc: "Grand wedding procession with royal music and fanfare",
      start: "20261212T200000",
      end: "20261212T223000"
    },
    {
      title: "Panigrahan Sanskar (Wedding Vows) - Neeraj & Nikita",
      desc: "Sacred Saat Phere around holy Agni at auspicious Muhurat",
      start: "20261212T223000",
      end: "20261213T030000"
    }
  ];

  const venueLoc = "Tulsi Marriage Garden, Near Bhairo Circle, Pratap Nagar, Jaipur, Rajasthan, India";

  let icsContent = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Neeraj Nikita Wedding//IN\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\n";

  events.forEach((ev, idx) => {
    icsContent += "BEGIN:VEVENT\r\n";
    icsContent += `UID:wedding-event-${idx + 1}-202612@neerajnikita.com\r\n`;
    icsContent += `DTSTAMP:20261120T120000Z\r\n`;
    icsContent += `DTSTART;TZID=Asia/Kolkata:${ev.start}\r\n`;
    icsContent += `DTEND;TZID=Asia/Kolkata:${ev.end}\r\n`;
    icsContent += `SUMMARY:${ev.title}\r\n`;
    icsContent += `DESCRIPTION:${ev.desc}\r\n`;
    icsContent += `LOCATION:${venueLoc}\r\n`;
    icsContent += `STATUS:CONFIRMED\r\n`;
    icsContent += "END:VEVENT\r\n";
  });

  icsContent += "END:VCALENDAR\r\n";

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Neeraj_Nikita_Wedding_Schedule_2026.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


/* ==========================================================================
   7. VENUE ADDRESS COPY
   ========================================================================== */
window.copyVenueAddress = function() {
  const addressText = "Tulsi Marriage Garden, Near Bhairo Circle, Pratap Nagar, Jaipur, Rajasthan, India";
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(addressText).then(showToast);
  } else {
    const tempInput = document.createElement('textarea');
    tempInput.value = addressText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast();
  }

  function showToast() {
    const toast = document.getElementById('copy-toast');
    if (toast) {
      toast.style.display = 'block';
      setTimeout(() => {
        toast.style.display = 'none';
      }, 3000);
    }
  }
};


/* ==========================================================================
   8. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');
  const items = document.querySelectorAll('.nav-item');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  items.forEach((item) => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}
