class Timer {
  constructor(private timeStart: string, private timeLeft: string) {
    this.timeStart = timeStart;
    this.timeLeft = timeLeft;
  }
  updateTimeInfo(timeStart: string, timeLeft: string) {
    this.timeStart = timeStart;
    this.timeLeft = timeLeft;
  }
  setLocalStorageTimeLeft() {
    localStorage.setItem("timeLeft", this.timeLeft);
  }
  getLocalStorageTimeLeft() {
    if (!localStorage.getItem("timeLeft")) {
      return 0;
    }
    return localStorage.getItem("timeLeft");
  }
}

export default Timer;
