// Mode Switcher Logic
function switchMode(mode) {
  // Grab desktop and mobile buttons
  const btnDual = document.getElementById('btn-dual');
  const btnClinician = document.getElementById('btn-clinician');
  const btnHobbyist = document.getElementById('btn-hobbyist');

  const mBtnDual = document.getElementById('m-btn-dual');
  const mBtnClinician = document.getElementById('m-btn-clinician');
  const mBtnHobbyist = document.getElementById('m-btn-hobbyist');
  
  // Helper to safely remove class
  const removeActive = (el) => el && el.classList.remove('active-mode');
  
  removeActive(btnDual);
  removeActive(btnClinician);
  removeActive(btnHobbyist);
  removeActive(mBtnDual);
  removeActive(mBtnClinician);
  removeActive(mBtnHobbyist);
  
  // Reset active classes on body
  document.body.classList.remove('mode-active-clinician');
  document.body.classList.remove('mode-active-hobbyist');
  
  const addActive = (el) => el && el.classList.add('active-mode');

  // Set selected mode
  if (mode === 'clinician') {
    addActive(btnClinician);
    addActive(mBtnClinician);
    document.body.classList.add('mode-active-clinician');
  } else if (mode === 'hobbyist') {
    addActive(btnHobbyist);
    addActive(mBtnHobbyist);
    document.body.classList.add('mode-active-hobbyist');
  } else {
    addActive(btnDual);
    addActive(mBtnDual);
  }
}

// Audio Player Widget Toggle
const tracks = [
  { title: "Tum Hi Ho", artist: "Arijit Singh" },
  { title: "Dil Beparwah", artist: "Papon" },
  { title: "Dil Ibadat", artist: "KK" },
  { title: "Hothon Se Chhuyolo Tum", artist: "Jagjit Singh" },
  { title: "Chupke Chupke Raat Din", artist: "Ghulam Ali" },
  { title: "Humko Man Ki Shakti Dena", artist: "Chitra Singh" },
  { title: "Zindagi Ek Safar Hai", artist: "Kishore Kumar" },
  { title: "Kya Hua Tera Wada", artist: "R. D. Burman / Md. Rafi" },
  { title: "Ranjish Hi Sahi", artist: "Chandan Das" },
  { title: "Suhani Raat Dhal Chuki", artist: "Md. Rafi" },
  { title: "Kabhi Kabhie Mere Dil Mein", artist: "Mukesh" },
  { title: "Rehne Do", artist: "Kavish" }
];
let currentTrackIndex = 0;

function toggleAudio() {
  const disc = document.getElementById('audio-disc');
  const playIcon = document.getElementById('play-icon');
  
  if (disc.classList.contains('spinning')) {
    disc.classList.remove('spinning');
    playIcon.className = 'fa-solid fa-play';
  } else {
    disc.classList.add('spinning');
    playIcon.className = 'fa-solid fa-pause';
  }
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  const track = tracks[currentTrackIndex];
  
  const titleEl = document.getElementById('song-title');
  const artistEl = document.getElementById('song-artist');
  
  if (titleEl) titleEl.textContent = track.title;
  if (artistEl) artistEl.textContent = track.artist;
  
  const disc = document.getElementById('audio-disc');
  const playIcon = document.getElementById('play-icon');
  if (disc && playIcon && !disc.classList.contains('spinning')) {
    disc.classList.add('spinning');
    playIcon.className = 'fa-solid fa-pause';
  }
}

// Terminal Logic
const termInput = document.getElementById('term-input');
const termHistory = document.getElementById('term-history');
const termBody = document.getElementById('term-body');

if (termInput) {
  termInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const commandText = termInput.value.trim();
      termInput.value = '';
      if (commandText) {
        processCommand(commandText);
      }
    }
  });
}

function processCommand(rawCmd) {
  const cmd = rawCmd.toLowerCase().trim();
  
  // Append input command in history
  appendTerminalLine(`visitor@ajay-terminal:~$ ${rawCmd}`, 'input-line');
  
  let output = '';
  let outputType = 'output-line';
  
  switch(cmd) {
    case 'help':
      output = `Available commands:
  email      - Show contact email
  github     - Link to projects directory & deployments
  education  - Display academic journey milestones
  hobbies    - List extracurricular personal activities
  clear      - Clear console history`;
      break;
      
    case 'email':
      output = `Email address: mehtaajay8873@gmail.com`;
      outputType = 'output-line success';
      break;
      
    case 'github':
      output = `GitHub / Local Path: c:/mehta/
Live Project Deployments:
 - Ward Companion: https://ward-companion.pages.dev
 - Splitway: https://splitway.pages.dev
 - Guess the Case: https://guessthecase.pages.dev
 - AJ Medical Archive: https://ajmbbsarchive.pages.dev`;
      outputType = 'output-line success';
      break;
      
    case 'education':
      output = `Academic Roadmaps & Highlights:
 - Saraswati Shishu Vidya Mandir (Primary studies)
 - Jawahar Navodaya Vidyalaya, Palamu (Passed 10th class in 2020)
 - National Eligibility cum Entrance Test (NEET UG) 2022:
   Cleared in 1st attempt with 613 Marks along with Board Exams.
 - Final-Year MBBS: Currently doing core clinical postings and rounds.`;
      outputType = 'output-line';
      break;
      
    case 'hobbies':
      output = `Extracurricular Creative Outlets:
 - Making detailed digital/pencil clinical sketches and anatomical layouts.
 - Completed Reads: Godan, Nirmala, Gunaho Ka Devta, Deewar Mein Ek Khidki Rehti Thi, Ret Ki Machhali, Metamorphosis, White Nights, Stoic philosophy.
 - Music Favorites: Arijit Singh, Papon, KK, Jagjit Singh, Ghulam Ali, Chitra Singh, Kishore Kumar, R. D. Burman, Rafi, Mukesh, Chandan Das, Kavish.
 - Aspiring to travel & backpack, currently focused on completing rotations.`;
      outputType = 'output-line';
      break;
      
    case 'clear':
      termHistory.innerHTML = '';
      return;
      
    default:
      output = `Command not found: '${rawCmd}'. Type 'help' to see the list of valid commands.`;
      outputType = 'output-line error';
  }
  
  appendTerminalLine(output, outputType);
  
  // Auto scroll to bottom
  termBody.scrollTop = termBody.scrollHeight;
}

function appendTerminalLine(text, className) {
  const line = document.createElement('div');
  line.className = `terminal-line ${className}`;
  line.textContent = text;
  termHistory.appendChild(line);
}

// Global click-to-run handler
function runCommand(cmd) {
  if (termInput) {
    termInput.value = cmd;
    processCommand(cmd);
  }
}

// Mobile Toggle Navigation Drawer
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
  const menuIcon = menuToggle.querySelector('i');
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('open');
    if (mobileMenu.classList.contains('open')) {
      menuIcon.className = 'fa-solid fa-xmark';
    } else {
      menuIcon.className = 'fa-solid fa-bars';
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && e.target !== menuToggle) {
      mobileMenu.classList.remove('open');
      menuIcon.className = 'fa-solid fa-bars';
    }
  });
}

function toggleMobileMenu() {
  if (mobileMenu && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;
    if (menuIcon) {
      menuIcon.className = 'fa-solid fa-bars';
    }
  }
}

// Simple active navigation highlighting on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  let currentId = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 120)) {
      currentId = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === currentId) {
      link.classList.add('active');
    }
  });
});
