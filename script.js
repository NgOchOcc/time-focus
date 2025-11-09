class FocusTimer {
    constructor() {
        this.totalSeconds = 25 * 60;
        this.currentSeconds = this.totalSeconds;
        this.isRunning = false;
        this.isPaused = false;
        this.intervalId = null;
        this.sessionsCompleted = 0;
        this.totalFocusTime = 0;

        this.initElements();
        this.initEventListeners();
        this.loadStats();
        this.updateDisplay();
    }

    initElements() {
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.sessionType = document.getElementById('session-type');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.sessionsCount = document.getElementById('sessionsCount');
        this.totalTimeDisplay = document.getElementById('totalTime');
        this.completeSound = document.getElementById('completeSound');
        this.coffeeIcon = document.querySelector('.coffee-icon');
        this.presetButtons = document.querySelectorAll('.preset-btn');
        this.customMinutesInput = document.getElementById('customMinutes');
        this.setCustomBtn = document.getElementById('setCustomBtn');
    }

    initEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());

        this.presetButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!this.isRunning) {
                    const minutes = parseInt(e.target.dataset.minutes);
                    this.setTimer(minutes);

                    this.presetButtons.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                }
            });
        });

        this.setCustomBtn.addEventListener('click', () => {
            if (!this.isRunning) {
                const minutes = parseInt(this.customMinutesInput.value);
                if (minutes && minutes > 0 && minutes <= 180) {
                    this.setTimer(minutes);
                    this.presetButtons.forEach(b => b.classList.remove('active'));
                    this.customMinutesInput.value = '';
                } else {
                    alert('Please enter a valid time between 1 and 180 minutes.');
                }
            }
        });

        this.customMinutesInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.setCustomBtn.click();
            }
        });
    }

    setTimer(minutes) {
        this.totalSeconds = minutes * 60;
        this.currentSeconds = this.totalSeconds;
        this.updateDisplay();
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.isPaused = false;
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.coffeeIcon.classList.add('steaming');

        this.intervalId = setInterval(() => {
            this.currentSeconds--;
            this.updateDisplay();

            if (this.currentSeconds <= 0) {
                this.complete();
            }
        }, 1000);
    }

    pause() {
        if (!this.isRunning) return;

        this.isRunning = false;
        this.isPaused = true;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.coffeeIcon.classList.remove('steaming');

        clearInterval(this.intervalId);
    }

    reset() {
        this.isRunning = false;
        this.isPaused = false;
        this.currentSeconds = this.totalSeconds;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.coffeeIcon.classList.remove('steaming');

        clearInterval(this.intervalId);
        this.updateDisplay();
    }

    complete() {
        this.isRunning = false;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.coffeeIcon.classList.remove('steaming');

        clearInterval(this.intervalId);

        const completedMinutes = Math.floor(this.totalSeconds / 60);
        this.sessionsCompleted++;
        this.totalFocusTime += completedMinutes;
        this.saveStats();
        this.updateStats();

        this.completeSound.play().catch(e => console.log('Audio play failed:', e));

        this.showNotification('Focus Session Complete!', `Great job! You completed ${completedMinutes} minutes of focused work.`);

        this.currentSeconds = this.totalSeconds;
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.currentSeconds / 60);
        const seconds = this.currentSeconds % 60;

        this.minutesDisplay.textContent = String(minutes).padStart(2, '0');
        this.secondsDisplay.textContent = String(seconds).padStart(2, '0');

        document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - Focus Timer`;

        const progress = ((this.totalSeconds - this.currentSeconds) / this.totalSeconds) * 100;
        document.documentElement.style.setProperty('--progress', `${progress}%`);
    }

    updateStats() {
        this.sessionsCount.textContent = this.sessionsCompleted;
        this.totalTimeDisplay.textContent = `${this.totalFocusTime} min`;
    }

    saveStats() {
        const today = new Date().toDateString();
        const stats = {
            date: today,
            sessions: this.sessionsCompleted,
            totalTime: this.totalFocusTime
        };
        localStorage.setItem('focusTimerStats', JSON.stringify(stats));
    }

    loadStats() {
        const saved = localStorage.getItem('focusTimerStats');
        if (saved) {
            const stats = JSON.parse(saved);
            const today = new Date().toDateString();

            if (stats.date === today) {
                this.sessionsCompleted = stats.sessions;
                this.totalFocusTime = stats.totalTime;
            } else {
                this.sessionsCompleted = 0;
                this.totalFocusTime = 0;
            }
        }
        this.updateStats();
    }

    showNotification(title, body) {
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                new Notification(title, { body, icon: '☕' });
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification(title, { body, icon: '☕' });
                    }
                });
            }
        }

        alert(`${title}\n\n${body}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const timer = new FocusTimer();

    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});
