
function countdown (countdownSeconds, stepCallback, completeCallback) {

    clearTimeout(countdown.timer);

    var target = new Date().getTime() + (countdownSeconds * 1000);

    (function timer () {

        var secondsRemaining = (target - new Date().getTime()) / 1000;
        var minutes = Math.floor(secondsRemaining / 60);
        var seconds = Math.round(secondsRemaining % 60);

        if (seconds == 60) {
            seconds = 0;
            minutes += 1;
        }

        if (Math.round(secondsRemaining) < 1) {
            completeCallback();
        }
        else {
            stepCallback(minutes, seconds);
            countdown.timer = setTimeout(timer, 1000);
        }
    })();
}