var pomodoro = {
  started: false,
  minutes: 0,
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
      console.log('timer started');
      self.startWork.apply(self);
    }

    document.querySelector('#pause').onclick = function(){
      self.pauseTimer.apply(self);
    };

    document.querySelector('#reset').onclick = function(){
      self.resetTimer.apply(self);
    }
  },

  resetVariables: function(mins, secs, started){
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
  },

  startWork: function() {
    this.resetVariables(25, 0, true);
  },

  pauseTimer: function(){
    if (this.started === true) {
      console.log('paused');
      this.started = false;
      document.querySelector('#pause').innerHTML = 'Un-pause';
    } else if (this.started === false) {
      console.log('unpaused');
      this.started = true;
      document.querySelector('#pause').innerHTML = 'Pause';
    }

    this.updateDom();
  },

  resetTimer: function(){
    console.log('reset timer');
    this.resetVariables(25, 0, false);
    this.updateDom();
  },

  toDoubleDigit : function(num){
    if(num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },

  updateDom : function(){
    this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
  },

  intervalCountdown : function(){
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

  timerComplete : function(){
    this.started = false;
    window.alert('Timer complete!')
  }
};

window.onload = function(){
  pomodoro.init();
};
