// Расписание троллейбусов
var trolleyScheduleHome = ["06:20", "06:42", "07:03", "07:24", "07:45", "08:05", "08:25", "08:45", "09:05", "09:20", "09:44", "10:19", "10:45", "11:25", "12:03", "12:27", "12:52", "13:23", "13:45", "14:22", "15:01", "15:32", "16:05", "16:22", "16:42", "17:02", "17:22", "18:01", "18:41", "19:21", "20:36"];

var trolleyScheduleReturn = ["06:28", "07:07", "07:31", "07:51", "08:11", "08:31", "08:51", "09:06", "09:30", "10:05", "10:31", "11:11", "11:49", "12:13", "12:38", "13:09", "13:31", "14:08", "14:47", "15:18", "15:52", "16:09", "16:29", "16:49", "17:09", "17:28", "17:48", "18:07", "18:28", "19:08", "19:42", "20:22"];

var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function updateClock() {
    var now = new Date();
    var day = (now.getDay() + 6) % 7; // Перемещаем воскресенье в конец недели
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    document.getElementById('time').innerHTML = hours + ":" + minutes + ":" + seconds;
    updateDay(day);
    updateTimers(now);
}

function updateDay(day) {
    for (var i = 0; i < 7; i++) {
        document.getElementById('day' + i).classList.remove('current');
    }
    var currentDay = (day + 1) % 7; // Добавляем 1 к индексу дня недели
    document.getElementById('day' + currentDay).classList.add('current');
}


function updateTimers(now) {
    var currentTime = now.getHours() * 60 + now.getMinutes();
    var nextTrolleyHome = trolleyScheduleHome.find(time => {
        var [hours, minutes] = time.split(":");
        return hours * 60 + parseInt(minutes) > currentTime;
    });
    var nextTrolleyReturn = trolleyScheduleReturn.find(time => {
        var [hours, minutes] = time.split(":");
        return hours * 60 + parseInt(minutes) > currentTime;
    });
    updateCountdown('countdownHome', nextTrolleyHome, now);
    updateCountdown('countdownReturn', nextTrolleyReturn, now);
}

function updateCountdown(elementId, nextTrolley, now) {
    if (nextTrolley) {
        var [hours, minutes] = nextTrolley.split(":");
        var nextTrolleyTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        var diff = Math.floor((nextTrolleyTime - now) / 1000); // difference in seconds
        var diffHours = Math.floor(diff / 3600);
        var diffMinutes = Math.floor((diff % 3600) / 60);
        var diffSeconds = diff % 60;
        if (diffHours < 10) diffHours = "0" + diffHours;
        if (diffMinutes < 10) diffMinutes = "0" + diffMinutes;
        if (diffSeconds < 10) diffSeconds = "0" + diffSeconds;
        document.getElementById(elementId).innerHTML = diff > 300 ? diffHours + ":" + diffMinutes + ":" + diffSeconds : "<span class='countdown'>" + diffHours + ":" + diffMinutes + ":" + diffSeconds + "</span>";
    } else {
        document.getElementById(elementId).innerHTML = "No more trolleys today";
    }
}


setInterval(updateClock, 1000);