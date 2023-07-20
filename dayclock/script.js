/*
    For compatibility with Safari 9:
    i.e. iOS 9 (9/2015) / OS X El Capitan (9/2015)
    Use var instead of let <https://caniuse.com/let>
*/

document.addEventListener("DOMContentLoaded", function () {
    function updateTime() {
        const now = new Date();
        const locale = navigator.language || navigator.userLanguage;

        const time = now.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' });
        const weekday = now.toLocaleDateString(locale, { weekday: 'long' });
        const date = now.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });

        const hour = now.getHours();
        // const hour = 22;
        var greeting = "";
        var themeClassName = "clock-light";
        var topClassName = "";
        if (hour >= 6 && hour < 12) {
            // Morning: yellow background, white text
            topClassName = 'top-morning';
            greeting = 'Good morning';
        } else if (hour >= 12 && hour < 18) {
            // Afternoon: blue background, white text
            topClassName = 'top-afternoon';
            greeting = 'Good afternoon';
        } else if (hour >= 18 && hour < 22) {
            // Evening: purple background, white text
            topClassName = 'top-evening';
            greeting = 'Good evening';
        } else {
            // Evening: black background, dark red text
            themeClassName = "clock-dark";
            topClassName = 'top-night';
            greeting = 'Good night';
        }

        document.getElementById("container").classList.remove("clock-light");
        document.getElementById("container").classList.remove("clock-dark");
        document.getElementById("container").classList.add(themeClassName);

        document.getElementById("top").className = 'top';
        document.getElementById("top").classList.add(topClassName);

        document.getElementById('greeting').innerHTML = greeting.toUpperCase();
        document.getElementById('weekday').innerHTML = weekday.toUpperCase();
        document.getElementById('date').innerHTML = date;
        document.getElementById('time').innerHTML = time.toUpperCase();

        // Calculate the time remaining until the next full minute
        const secondsRemaining = 60 - now.getSeconds();

        // Schedule the next update at the next full minute
        setTimeout(updateTime, secondsRemaining * 1000);
    }

    document.getElementById('top').classList.add('top-fade');

    updateTime(); // Initial call to start the clock
});
