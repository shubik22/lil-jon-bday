const MONTHS = [
  ['January', 31],
  ['February', 28],
  ['March', 31],
  ['April',30],
  ['May', 31],
  ['June', 30],
  ['July', 31],
  ['August', 31],
  ['September',30],
  ['October',31],
  ['November', 30],
  ['December', 31]
];

const BIRTHDAYS = {
  '1': {
    '7': ['Nicolas'],
    '12': ['Zayn'],
  },
  '2': {
    '1': ['Harry'],
  },
  '3': {},
  '4': {
    '7': ['Nathan'],
  },
  '5': {
    '31': ['Hayk'],
  },
  '6': {
    '11': ['Daniel'],
    '28': ['Ben']
  },
  '7': {
    '16': ['Elly']
  },
  '8': {
    '11': ['Pablo'],
    '29': ['Liam']
  },
  '9': {
    '13': ['Niall'],
  },
  '10': {
    '21': ['Sam', 'Virginia']
  },
  '11': {
  	'6': ['Aprotim'],
	},
  '12': {
    '24': ['Louis'],
  }
};

const AUDIO_URLS = [
  'https://sound.peal.io/ps/audios/000/000/430/original/liljon_3.mp3',
  'https://sound.peal.io/ps/audios/000/000/429/original/liljon_2.mp3',
  'https://sound.peal.io/ps/audios/000/000/431/original/liljon_8.mp3',
  'https://sound.peal.io/ps/audios/000/002/812/original/Okay!.wav',
  'https://sound.peal.io/ps/audios/000/002/811/original/What!.wav',
  'https://sound.peal.io/ps/audios/000/002/810/original/Yeah!.wav'
];

const INCREMENT_MS = 500;

const SERIOUS_JON_URL = 'http://media.hotbirthdays.com/files/1971/01/17/lil-jon-3.jpg';
const BIRTHDAY_JON_URL = 'https://images.sk-static.com/images/media/profile_images/artists/370337/huge_avatar';

function App(monthEl, dayEl, msgEl, imgEl) {
  this.monthEl = monthEl;
  this.dayEl = dayEl;
  this.msgEl = msgEl;
  this.imgEl = imgEl;
  this.currentMonthIdx = 0;
  this.currentDay = 1;
  this.audios = [];
  AUDIO_URLS.forEach((url) => {
    this.audios.push(new Audio(url))
  });
}

App.prototype.updateText = function updateText() {
  this.monthEl.innerHTML = MONTHS[this.currentMonthIdx][0];
  this.dayEl.innerHTML = this.currentDay;

};

App.prototype.incrementDay = function incrementDay() {
  const currentMaxDay = MONTHS[this.currentMonthIdx][1];
  if (this.currentDay + 1 <= currentMaxDay) {
    this.currentDay += 1;
  } else {
    this.currentMonthIdx = (this.currentMonthIdx + 1) % 11;
    this.currentDay = 1;
  }
};

App.prototype.checkBirthdays = function checkBirthdays() {
  const birthdayPeople = BIRTHDAYS[String(this.currentMonthIdx + 1)][String(this.currentDay)] || [];
  if (birthdayPeople.length < 1) {
    this.imgEl.src = SERIOUS_JON_URL;
    this.msgEl.innerHTML = 'Just another day...';
    return;
  }

  const newMsg = "Happy birthday " + birthdayPeople.join(' and ') + '!!!';
  this.msgEl.innerHTML = newMsg;
  this.imgEl.src = BIRTHDAY_JON_URL;
  this.sayHappyBirthday();
};

App.prototype.sayHappyBirthday = function sayHappyBirthday() {
  const audio = this.audios[Math.floor(Math.random() * this.audios.length)];
  audio.play();
};

App.prototype.step = function step() {
  this.incrementDay();
  this.updateText();
  this.checkBirthdays();
};

App.prototype.run = function run() {
  this.updateText();
  this.intervalId = setInterval(this.step.bind(this), INCREMENT_MS);
};

App.prototype.stop = function stop() {
  clearInterval(this.intervalId);
};
