document.addEventListener('DOMContentLoaded', function () {
  // theme switch 
  const themeToggleButton = document.getElementById('themeToggle');
  const themeIcon = themeToggleButton.querySelector('img');

  themeToggleButton.addEventListener('click', function () {
    const currentTheme = document.body.className;

    if (currentTheme === 'light-theme') {
      document.body.className = 'dark-theme';
      themeIcon.src = './assets/images/sun-icon.svg';
    } else {
      document.body.className = 'light-theme';
      themeIcon.src = './assets/images/moon-icon.svg';
    }
  });

  //input length limit
  function limitInputLength(input, maxLength) {
    input.addEventListener('input', function() {
      if (this.value.length > maxLength) {
        this.value = this.value.substring(0, maxLength);
      }
    });
  }

  limitInputLength(document.getElementById('minutes'), 2);
  limitInputLength(document.getElementById('seconds'), 2);

  //volume mode
  const volumeButton = document.getElementById('volume-mode');
  const speakerNoneIcon = './assets/images/speaker-none.svg';
  const speakerHighIcon = './assets/images/speaker-high.svg';
  
  let volumeMuted = true;
  
  volumeButton.addEventListener('click', function() {
    if (volumeMuted) {
      audio.volume = 1;
      volumeMuted = false;
      volumeButton.querySelector('img').src = speakerHighIcon;
    } else {
      audio.volume = 0;
      volumeMuted = true;
      volumeButton.querySelector('img').src = speakerNoneIcon;
    }
  });
 
  //
  const minHolder = document.getElementById('minutes');
  const secHolder = document.getElementById('seconds');
  const startButton = document.getElementById('start');
  const resetButton = document.getElementById('reset');

  const audio = document.querySelector('audio');

  const playIcon = './assets/images/play-circle.svg';
  const pauseIcon = './assets/images/pause-circle.svg';
  const timerIcon = './assets/images/timer.svg';
  const stopIcon = './assets/images/stop-circle.svg';

  let time, start, counter, minutes, seconds;
  let running = false;

  function getTime() {
    minutes = parseInt(minHolder.value,10);
    seconds = parseInt(secHolder.value,10);
    time = (minutes * 60000) + (seconds * 1000);
  }

  function convertMs(ms) {
    let m = ms / 1000 / 60;
    let s = (ms/1000) % 60;
    
    m = '0' + Math.floor(m);
    s = '0' + Math.floor(s);
    const time = [m.slice(-2),s.slice(-2)];
    
    return time;
  }

  function countdown() {
    current = new Date().getTime() - start;
    var display;
    
    if (current < time) {
      display = convertMs(time - current);
      minHolder.value = display[0];
      secHolder.value = display[1];
    } else {
      pauseTimer();
      audio.play();
      setTimeout(() => {
        audio.pause();
      }, 2000);
      return;
    }
  }

  function startTimer() {
    getTime();
    
    if(time) {
      start = new Date().getTime();
      counter = window.setInterval(countdown,1);
      startButton.innerText = 'Pause';
      startButton.src = pauseIcon;
      resetButton.src = stopIcon;

      running = true;
    }
  }

  function pauseTimer() {
    start = new Date().getTime();
    getTime();
    window.clearInterval(counter);
    startButton.innerText = 'Start';
    startButton.src = playIcon;
    resetButton.src = timerIcon;
    
    running = false;
  }

  function resetTimer() {
    pauseTimer();
    startButton.innerText = 'Start';
    startButton.src = playIcon;
    resetButton.src = timerIcon;
    minHolder.value = '00';
    secHolder.value = '00';
  }

  function activateTimer() {
    if (running) {
      pauseTimer();
    } else {
      startTimer();
      if (volumeMuted) {
        audio.volume = 0;
      }
    }
  }

  startButton.addEventListener('click',activateTimer);
  resetButton.addEventListener('click',resetTimer);
});