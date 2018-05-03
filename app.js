var pomodoro = {
  started: false,
  minutes: 25,
  seconds: 0,
  interval: null,
  minutesDom: null,
  secondsDom: null,

  init: function() {
    var self = this;
    this.minutesDom = document.querySelector('#minutes');
    this.secondsDom = document.querySelector('#seconds');

    this.interval = setInterval(function(){
      self.intervalCountdown.apply(self);
    }, 1000);

    document.querySelector('#start').onclick = function(){
      self.resetTimer.apply(self);
    },

    document.querySelector('#pause').onclick = function(){
      self.pauseTimer.apply(self);
    },

    document.querySelector('#short').onclick = function(){
      self.resetShortBreak.apply(self);
    },

    document.querySelector('#long').onclick = function(){
      self.resetLongBreak.apply(self);
    }

  },

  resetVariables: function(mins, secs, started){
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
  },

  startWork: function() {
    this.resetVariables(25, 0, true);
    this.updateDom();
  },

  pauseTimer: function(){
    if (this.started === true) {
      this.started = false;
      document.querySelector('#pause').innerHTML = 'Continue';
    } else if (this.started === false) {
      this.started = true;
      document.querySelector('#pause').innerHTML = 'Pause';
    }

    this.updateDom();
  },

  resetTimer: function(){
    document.querySelector('#pause').innerHTML = 'Begin';
    this.resetVariables(25, 0, false);
    this.updateDom();
  },

  resetShortBreak: function(){
    document.querySelector('#pause').innerHTML = 'Begin';
    this.resetVariables(5, 0, false);
    this.updateDom();
  },

  resetLongBreak: function(){
    document.querySelector('#pause').innerHTML = 'Begin';
    this.resetVariables(15, 0, false);
    this.updateDom();
  },

  toDoubleDigit : function(num){
    if(num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },

  updateDom: function(){
    this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
  },

  intervalCountdown: function(){
    if(!this.started) return false;
    if(this.seconds == 0) {
      if(this.minutes == 0) {
        this.timerComplete();
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  },

  alertSound: function() {
    document.getElementById('babyalert').play();
  },

  timerComplete: function(){
    this.alertSound();
    this.started = false;
    window.alert('Timer complete!')
  }
};

window.onload = function(){
  pomodoro.init();
};
