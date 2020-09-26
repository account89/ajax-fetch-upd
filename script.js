const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/apple.jpg',
    text: "La Manzana"
  },
  {
    image: './img/apricot.jpg',
    text: "El Damasco"
  },
  {
    image: './img/banana.jpg',
    text: "El Plátano"
  },
  {
    image: './img/lemon.jpeg',
    text: "El Limón"
  },
  {
    image: './img/mango.jpg',
    text: "El mango"
  },
  {
    image: './img/melon.jpg',
    text: "El melón"
  },
  {
    image: './img/nectarine.jpg',
    text: "La Nectarina"
  },
  {
    image: './img/pear.jpg',
    text: "La pera"
  },
  {
    image: './img/strawberry.jpg',
    text: 'La fresa'
  },
  {
    image: './img/watermelon.jpg',
    text: 'La sandía'
  },
  {
    image: './img/grapes.jpg',
    text: 'La uva'
  },
  {
    image: './img/grapefruit.jpg',
    text: 'El pomelo'
  }
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();